import { useEffect, useMemo, useState } from "react";
import {
  FaAddressBook,
  FaArrowRight,
  FaBars,
  FaBox,
  FaBoxOpen,
  FaChevronLeft,
  FaChevronRight,
  FaChartPie,
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaFileExport,
  FaInfoCircle,
  FaLeaf,
  FaPen,
  FaPhone,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaSyncAlt,
  FaTag,
  FaTimes,
  FaTrash,
  FaUserPlus,
  FaInbox,
} from "react-icons/fa";

type Section = "dashboard" | "contacts" | "produits";
type ToastType = "success" | "error" | "info" | "warning";

type Contact = {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  sujet: string;
  message: string;
  lu: boolean;
  created_at?: string;
};

type Produit = {
  id: number;
  nom: string;
  categorie: string;
  prix: number;
  unite: string;
  certification: string;
  origine: string;
  disponible: boolean;
  description: string;
  image_url?: string;
  created_at?: string;
};

type ContactField = {
  name: keyof Contact;
  label: string;
  type: "text" | "email" | "number" | "textarea";
  required: boolean;
  placeholder?: string;
  rows?: number;
};

type ProduitField = {
  name: keyof Produit;
  label: string;
  type: "text" | "number" | "textarea" | "checkbox" | "url";
  required: boolean;
  placeholder?: string;
  rows?: number;
  step?: string;
};

const contactFields: ContactField[] = [
  { name: "nom", label: "Nom complet", type: "text", required: true, placeholder: "Marie Rasoa" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "marie@email.com" },
  { name: "telephone", label: "Téléphone", type: "text", required: true, placeholder: "032 12 345 67" },
  { name: "entreprise", label: "Entreprise", type: "text", required: true, placeholder: "Bio Madagascar SARL" },
  { name: "sujet", label: "Sujet", type: "text", required: true, placeholder: "Commande en gros" },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "Détails de la demande...",
    rows: 4,
  },
];

const produitFields: ProduitField[] = [
  { name: "nom", label: "Nom du produit", type: "text", required: true, placeholder: "Riz Bio" },
  { name: "categorie", label: "Catégorie", type: "text", required: true, placeholder: "Céréales" },
  { name: "prix", label: "Prix (MGA)", type: "number", required: true, placeholder: "5000", step: "any" },
  { name: "unite", label: "Unité", type: "text", required: true, placeholder: "kg" },
  { name: "certification", label: "Certification", type: "text", required: true, placeholder: "Bio" },
  { name: "origine", label: "Origine", type: "text", required: true, placeholder: "Madagascar" },
  { name: "disponible", label: "Disponible", type: "checkbox", required: false },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "Description du produit...",
    rows: 3,
  },
  { name: "image_url", label: "URL de l'image", type: "url", required: false, placeholder: "https://example.com/image.jpg" },
];

const getDefaultContactValues = (): Record<string, any> => ({
  nom: "",
  email: "",
  telephone: "",
  entreprise: "",
  sujet: "",
  message: "",
  lu: false,
});

const getDefaultProduitValues = (): Record<string, any> => ({
  nom: "",
  categorie: "",
  prix: 0,
  unite: "",
  certification: "",
  origine: "",
  disponible: false,
  description: "",
  image_url: "",
});

const API_BASE = "http://localhost:8000/api";
const ITEMS_PER_PAGE = 8;

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [currentSection, setCurrentSection] = useState<Section>("dashboard");
  const [contactsPage, setContactsPage] = useState(1);
  const [produitsPage, setProduitsPage] = useState(1);
  const [searchContacts, setSearchContacts] = useState("");
  const [searchProduits, setSearchProduits] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<"contact" | "produit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [currentViewItem, setCurrentViewItem] = useState<Contact | Produit | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "contact" | "produit"; id: number } | null>(null);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);

  const filteredContacts = useMemo(() => {
    const query = searchContacts.trim().toLowerCase();
    if (!query) return contacts;
    return contacts.filter(
      (contact) =>
        contact.nom.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.entreprise.toLowerCase().includes(query) ||
        contact.sujet.toLowerCase().includes(query),
    );
  }, [contacts, searchContacts]);

  const filteredProduits = useMemo(() => {
    const query = searchProduits.trim().toLowerCase();
    if (!query) return produits;
    return produits.filter(
      (produit) =>
        produit.nom.toLowerCase().includes(query) ||
        produit.categorie.toLowerCase().includes(query) ||
        produit.origine.toLowerCase().includes(query) ||
        produit.certification.toLowerCase().includes(query),
    );
  }, [produits, searchProduits]);

  const contactsPageCount = Math.max(1, Math.ceil(filteredContacts.length / ITEMS_PER_PAGE));
  const produitsPageCount = Math.max(1, Math.ceil(filteredProduits.length / ITEMS_PER_PAGE));

  const pagedContacts = filteredContacts.slice((contactsPage - 1) * ITEMS_PER_PAGE, contactsPage * ITEMS_PER_PAGE);
  const pagedProduits = filteredProduits.slice((produitsPage - 1) * ITEMS_PER_PAGE, produitsPage * ITEMS_PER_PAGE);

  useEffect(() => {
    if (contactsPage > contactsPageCount) {
      setContactsPage(contactsPageCount);
    }
  }, [contactsPageCount, contactsPage]);

  useEffect(() => {
    if (produitsPage > produitsPageCount) {
      setProduitsPage(produitsPageCount);
    }
  }, [produitsPageCount, produitsPage]);

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  function showToast(message: string, type: ToastType = "success") {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4500);
  }

  async function apiRequest(endpoint: string, method = "GET", data: any = null) {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, options);
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Erreur HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur de connexion";
      showToast(message, "error");
      throw error;
    }
  }

  async function loadDashboard() {
    try {
      const [contactsData, produitsData] = await Promise.all([apiRequest("/contact"), apiRequest("/produit")]);
      setContacts(contactsData.data || []);
      setProduits(produitsData.data || []);
    } catch {
      // already handled by apiRequest
    }
  }

  async function loadContacts() {
    try {
      const data = await apiRequest("/contact");
      setContacts(data.data || []);
      setContactsPage(1);
    } catch {
      // handled above
    }
  }

  async function loadProduits() {
    try {
      const data = await apiRequest("/produit");
      setProduits(data.data || []);
      setProduitsPage(1);
    } catch {
      // handled above
    }
  }

  function handleSectionChange(section: Section) {
    setCurrentSection(section);
    setSidebarOpen(false);
    if (section === "contacts") loadContacts();
    if (section === "produits") loadProduits();
    if (section === "dashboard") loadDashboard();
  }

  function refreshCurrentData() {
    if (currentSection === "dashboard") loadDashboard();
    if (currentSection === "contacts") loadContacts();
    if (currentSection === "produits") loadProduits();
    showToast("Données rafraîchies", "info");
  }

  function openModal(type: "contact" | "produit", item?: Contact | Produit) {
    setEditingType(type);
    setEditingId(item?.id ?? null);
    setFormValues(item ? { ...item } : type === "contact" ? getDefaultContactValues() : getDefaultProduitValues());
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingType(null);
    setEditingId(null);
    setFormValues({});
  }

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) || 0 : value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingType) return;

    const endpoint = editingType === "contact" ? "/contact" : "/produit";
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${endpoint}/${editingId}` : endpoint;

    try {
      await apiRequest(url, method, formValues);
      showToast(editingId ? "Modifié avec succès" : "Créé avec succès", "success");
      closeModal();
      if (editingType === "contact") loadContacts();
      else loadProduits();
      loadDashboard();
    } catch {
      // handled by apiRequest
    }
  }

  function viewItem(type: "contact" | "produit", id: number) {
    const list = type === "contact" ? contacts : produits;
    const item = list.find((entry) => entry.id === id);
    if (!item) return;
    setCurrentViewItem(item);
    setViewModalOpen(true);
  }

  function closeViewModal() {
    setViewModalOpen(false);
    setCurrentViewItem(null);
  }

  function deleteItem(type: "contact" | "produit", id: number) {
    setDeleteTarget({ type, id });
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
    setDeleteTarget(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    const endpoint = deleteTarget.type === "contact" ? `/contact/${deleteTarget.id}` : `/produit/${deleteTarget.id}`;

    try {
      await apiRequest(endpoint, "DELETE");
      showToast("Supprimé avec succès", "success");
      closeDeleteModal();
      if (deleteTarget.type === "contact") loadContacts();
      else loadProduits();
      loadDashboard();
    } catch {
      // handled by apiRequest
    }
  }

  function exportData(type: "contacts" | "produits") {
    const data = type === "contacts" ? contacts : produits;
    if (!data.length) {
      showToast("Aucune donnée à exporter", "warning");
      return;
    }

    let csv = "";
    if (type === "contacts") {
      csv = "Nom,Email,Téléphone,Entreprise,Sujet,Lu\n";
      data.forEach((contact) => {
        csv += `"${contact.nom}","${contact.email}","${contact.telephone}","${contact.entreprise}","${contact.sujet}",${contact.lu ? "Oui" : "Non"}\n`;
      });
    } else {
      csv = "Nom,Catégorie,Prix,Unité,Origine,Certification,Disponible\n";
      data.forEach((produit) => {
        csv += `"${produit.nom}","${produit.categorie}",${produit.prix},"${produit.unite}","${produit.origine}","${produit.certification}",${produit.disponible ? "Oui" : "Non"}\n`;
      });
    }

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast(`Export ${type} terminé`, "success");
  }

  function formatDate(dateStr?: string) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const isContactView = currentViewItem ? "sujet" in currentViewItem : false;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200/80 shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-emerald-200/50">
              R
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 tracking-tight">Rekany Back</h1>
              <p className="text-xs text-gray-400 font-medium">Administration</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          <button
            type="button"
            onClick={() => handleSectionChange("dashboard")}
            className={`sidebar-link flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${
              currentSection === "dashboard" ? "active" : "text-gray-600"
            }`}
          >
            <FaChartPie className="text-lg" />
            Tableau de bord
          </button>
          <button
            type="button"
            onClick={() => handleSectionChange("contacts")}
            className={`sidebar-link flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${
              currentSection === "contacts" ? "active" : "text-gray-600"
            }`}
          >
            <FaAddressBook className="text-lg" />
            Contacts
            <span className="ml-auto hidden rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700" />
          </button>
          <button
            type="button"
            onClick={() => handleSectionChange("produits")}
            className={`sidebar-link flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${
              currentSection === "produits" ? "active" : "text-gray-600"
            }`}
          >
            <FaBoxOpen className="text-lg" />
            Produits
            <span className="ml-auto hidden rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700" />
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100/80 bg-white/60 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50/80 px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-700 text-xs font-bold text-white shadow-sm">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">Administrateur</p>
              <p className="truncate text-xs text-gray-400">admin@rekany.mg</p>
            </div>
            <button
              type="button"
              onClick={() => showToast("Déconnexion simulée", "info")}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 glass-card border-b border-gray-200/60 px-6 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSidebarOpen((current) => !current)}
                className="-ml-2 rounded-xl p-2 text-gray-600 hover:bg-gray-100 transition-colors lg:hidden"
              >
                <FaBars className="text-lg" />
              </button>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
                  {currentSection === "dashboard"
                    ? "Tableau de bord"
                    : currentSection === "contacts"
                    ? "Contacts"
                    : "Produits"}
                </h2>
                <p className="text-sm font-medium text-gray-400">
                  {currentSection === "dashboard"
                    ? "Vue d'ensemble du système"
                    : currentSection === "contacts"
                    ? "Gestion des contacts et messages"
                    : "Gestion du catalogue produits"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-100/60">
                <span className="status-dot online" />
                API Connectée
              </div>
              <button
                type="button"
                onClick={refreshCurrentData}
                className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                title="Rafraîchir"
              >
                <FaSyncAlt />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {currentSection === "dashboard" ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                <div className="card p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                      <FaAddressBook className="text-lg text-emerald-600" />
                    </div>
                    <span className="rounded-full bg-emerald-50/80 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                      Total
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">{contacts.length}</h3>
                  <p className="mt-0.5 text-sm font-medium text-gray-400">Contacts</p>
                </div>
                <div className="card p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                      <FaBoxOpen className="text-lg text-blue-600" />
                    </div>
                    <span className="rounded-full bg-blue-50/80 px-2.5 py-1 text-[10px] font-semibold text-blue-600">
                      Total
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">{produits.length}</h3>
                  <p className="mt-0.5 text-sm font-medium text-gray-400">Produits</p>
                </div>
                <div className="card p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                      <FaEnvelope className="text-lg text-amber-600" />
                    </div>
                    <span className="rounded-full bg-amber-50/80 px-2.5 py-1 text-[10px] font-semibold text-amber-600">
                      Non lus
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">{contacts.filter((contact) => !contact.lu).length}</h3>
                  <p className="mt-0.5 text-sm font-medium text-gray-400">Messages</p>
                </div>
                <div className="card p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                      <FaCheckCircle className="text-lg text-purple-600" />
                    </div>
                    <span className="rounded-full bg-purple-50/80 px-2.5 py-1 text-[10px] font-semibold text-purple-600">
                      Dispo
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">{produits.filter((produit) => produit.disponible).length}</h3>
                  <p className="mt-0.5 text-sm font-medium text-gray-400">Produits dispo</p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <FaUserPlus className="text-xs text-emerald-500" />
                      Derniers contacts
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleSectionChange("contacts")}
                      className="text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                    >
                      Voir tout <FaArrowRight className="ml-1 text-[10px]" />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50" aria-live="polite">
                    {contacts.slice(0, 5).length === 0 ? (
                      <div className="p-6 text-center text-gray-400 text-sm">
                        <FaUserPlus className="mr-2 inline" />Aucun contact
                      </div>
                    ) : (
                      contacts.slice(0, 5).map((contact) => (
                        <button
                          key={contact.id}
                          type="button"
                          onClick={() => viewItem("contact", contact.id)}
                          className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50/60"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm">
                            {contact.nom.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">{contact.nom}</p>
                            <p className="truncate text-xs text-gray-400">{contact.sujet}</p>
                          </div>
                          <span className="status-dot online text-gray-400 flex-shrink-0">{formatDate(contact.created_at)}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <FaBox className="text-xs text-blue-500" />
                      Derniers produits
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleSectionChange("produits")}
                      className="text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                    >
                      Voir tout <FaArrowRight className="ml-1 text-[10px]" />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50" aria-live="polite">
                    {produits.slice(0, 5).length === 0 ? (
                      <div className="p-6 text-center text-gray-400 text-sm">
                        <FaBoxOpen className="mr-2 inline" />Aucun produit
                      </div>
                    ) : (
                      produits.slice(0, 5).map((produit) => (
                        <button
                          key={produit.id}
                          type="button"
                          onClick={() => viewItem("produit", produit.id)}
                          className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50/60"
                        >
                          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-400">
                            {produit.image_url ? (
                              <img
                                src={produit.image_url}
                                alt={produit.nom}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <FaBox className="text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">{produit.nom}</p>
                            <p className="truncate text-xs text-gray-400">
                              {produit.categorie} · {produit.prix.toLocaleString("fr-FR")} MGA
                            </p>
                          </div>
                          <span className={`status-dot ${produit.disponible ? "online" : "offline"}`} />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {currentSection === "contacts" ? (
            <div className="card overflow-hidden">
              <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-xs flex-1">
                  <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchContacts}
                    onChange={(event) => setSearchContacts(event.target.value)}
                    placeholder="Rechercher un contact..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-9 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-500 transition-shadow"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportData("contacts")}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    <FaFileExport className="text-xs" />
                    Exporter
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal("contact")}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-emerald-200/50 transition-colors hover:bg-emerald-700"
                  >
                    <FaPlus className="text-xs" />
                    Nouveau
                  </button>
                </div>
              </div>

              <div className="table-responsive overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/80 text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-5 py-3.5">Nom</th>
                      <th className="px-5 py-3.5">Email</th>
                      <th className="px-5 py-3.5">Téléphone</th>
                      <th className="px-5 py-3.5">Entreprise</th>
                      <th className="px-5 py-3.5">Sujet</th>
                      <th className="px-5 py-3.5">Statut</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {pagedContacts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-8 text-center text-gray-400">
                          <div className="spinner mx-auto" />
                        </td>
                      </tr>
                    ) : (
                      pagedContacts.map((contact) => (
                        <tr key={contact.id} className="group table-row-hover transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600">
                                {contact.nom.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-900">{contact.nom}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500">{contact.email}</td>
                          <td className="px-5 py-3.5 text-gray-500">{contact.telephone}</td>
                          <td className="px-5 py-3.5 text-gray-500">{contact.entreprise}</td>
                          <td className="px-5 py-3.5 text-gray-500">{contact.sujet}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              contact.lu ? "bg-gray-100 text-gray-500" : "bg-amber-50 text-amber-700"
                            }`}>
                              <span className={`status-dot ${contact.lu ? "offline" : "pending"}`} />
                              {contact.lu ? "Lu" : "Non lu"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => viewItem("contact", contact.id)}
                                className="rounded-lg p-1.5 text-blue-500 transition-colors hover:bg-blue-50"
                                title="Voir"
                              >
                                <FaEye className="text-xs" />
                              </button>
                              <button
                                type="button"
                                onClick={() => openModal("contact", contact)}
                                className="rounded-lg p-1.5 text-emerald-500 transition-colors hover:bg-emerald-50"
                                title="Modifier"
                              >
                                <FaPen className="text-xs" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteItem("contact", contact.id)}
                                className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
                                title="Supprimer"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {filteredContacts.length === 0 && pagedContacts.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-300">
                    <FaInbox />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Aucun contact</h3>
                  <p className="text-sm text-gray-400">Ajoutez votre premier contact.</p>
                </div>
              ) : null}

              <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3.5">
                <p className="text-xs text-gray-400">{filteredContacts.length} élément{filteredContacts.length > 1 ? "s" : ""}</p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setContactsPage((page) => Math.max(1, page - 1))}
                    disabled={contactsPage <= 1}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft className="text-[10px]" />
                  </button>
                  <span className="px-2 text-xs text-gray-500">{contactsPage} / {contactsPageCount}</span>
                  <button
                    type="button"
                    onClick={() => setContactsPage((page) => Math.min(contactsPageCount, page + 1))}
                    disabled={contactsPage >= contactsPageCount}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {currentSection === "produits" ? (
            <div className="card overflow-hidden">
              <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-xs flex-1">
                  <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchProduits}
                    onChange={(event) => setSearchProduits(event.target.value)}
                    placeholder="Rechercher un produit..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-9 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-500 transition-shadow"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportData("produits")}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    <FaFileExport className="text-xs" />
                    Exporter
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal("produit")}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-emerald-200/50 transition-colors hover:bg-emerald-700"
                  >
                    <FaPlus className="text-xs" />
                    Nouveau
                  </button>
                </div>
              </div>

              <div className="table-responsive overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/80 text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-5 py-3.5">Produit</th>
                      <th className="px-5 py-3.5">Catégorie</th>
                      <th className="px-5 py-3.5">Prix</th>
                      <th className="px-5 py-3.5">Origine</th>
                      <th className="px-5 py-3.5">Certification</th>
                      <th className="px-5 py-3.5">Disponible</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {pagedProduits.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-8 text-center text-gray-400">
                          <div className="spinner mx-auto" />
                        </td>
                      </tr>
                    ) : (
                      pagedProduits.map((produit) => (
                        <tr key={produit.id} className="group table-row-hover transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-400">
                                {produit.image_url ? (
                                  <img
                                    src={produit.image_url}
                                    alt={produit.nom}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <FaBox className="text-gray-400" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{produit.nom}</p>
                                <p className="text-[10px] text-gray-400">{produit.unite}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500">{produit.categorie}</td>
                          <td className="px-5 py-3.5 font-semibold text-gray-900">{produit.prix.toLocaleString("fr-FR")} MGA</td>
                          <td className="px-5 py-3.5 text-gray-500">{produit.origine}</td>
                          <td className="px-5 py-3.5">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                              <FaLeaf className="text-[9px]" />
                              {produit.certification}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${produit.disponible ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                              <span className={`status-dot ${produit.disponible ? "online" : "offline"}`} />
                              {produit.disponible ? "Oui" : "Non"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => viewItem("produit", produit.id)}
                                className="rounded-lg p-1.5 text-blue-500 transition-colors hover:bg-blue-50"
                                title="Voir"
                              >
                                <FaEye className="text-xs" />
                              </button>
                              <button
                                type="button"
                                onClick={() => openModal("produit", produit)}
                                className="rounded-lg p-1.5 text-emerald-500 transition-colors hover:bg-emerald-50"
                                title="Modifier"
                              >
                                <FaPen className="text-xs" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteItem("produit", produit.id)}
                                className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
                                title="Supprimer"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {filteredProduits.length === 0 && pagedProduits.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-300">
                    <FaBox className="text-gray-300" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Aucun produit</h3>
                  <p className="text-sm text-gray-400">Ajoutez votre premier produit.</p>
                </div>
              ) : null}

              <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3.5">
                <p className="text-xs text-gray-400">{filteredProduits.length} élément{filteredProduits.length > 1 ? "s" : ""}</p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setProduitsPage((page) => Math.max(1, page - 1))}
                    disabled={produitsPage <= 1}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft className="text-[10px]" />
                  </button>
                  <span className="px-2 text-xs text-gray-500">{produitsPage} / {produitsPageCount}</span>
                  <button
                    type="button"
                    onClick={() => setProduitsPage((page) => Math.min(produitsPageCount, page + 1))}
                    disabled={produitsPage >= produitsPageCount}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white border border-white/20 shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-sm">
              <h3 className="text-lg font-extrabold text-gray-900">
                {editingId ? `Modifier ${editingType === "contact" ? "le contact" : "le produit"}` : `Nouveau ${editingType === "contact" ? "contact" : "produit"}`}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            <form className="p-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {(editingType === "contact" ? contactFields : produitFields).map((field) => {
                  if (field.type === "textarea") {
                    return (
                      <div key={field.name}>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          {field.label} {field.required ? <span className="text-red-400">*</span> : null}
                        </label>
                        <textarea
                          name={field.name}
                          required={field.required}
                          rows={field.rows ?? 3}
                          value={formValues[field.name] ?? ""}
                          onChange={handleFormChange}
                          placeholder={field.placeholder}
                          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-500 transition-shadow"
                        />
                      </div>
                    );
                  }

                  if (field.type === "checkbox") {
                    return (
                      <div className="flex items-center gap-3 pt-1" key={field.name}>
                        <input
                          id={`chk-${field.name}`}
                          name={field.name}
                          type="checkbox"
                          checked={Boolean(formValues[field.name])}
                          onChange={handleFormChange}
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <label htmlFor={`chk-${field.name}`} className="text-sm font-medium text-gray-700">
                          {field.label}
                        </label>
                      </div>
                    );
                  }

                  return (
                    <div key={field.name}>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {field.label} {field.required ? <span className="text-red-400">*</span> : null}
                      </label>
                      <input
                        name={field.name}
                        type={field.type}
                        value={formValues[field.name] ?? ""}
                        onChange={handleFormChange}
                        required={field.required}
                        step={field.step}
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-500 transition-shadow"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-emerald-200/50 transition-colors hover:bg-emerald-700"
                >
                  <FaCheckCircle className="text-xs" />
                  <span>{editingId ? "Mettre à jour" : "Enregistrer"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {viewModalOpen && currentViewItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white border border-white/20 shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-sm">
              <h3 className="text-lg font-extrabold text-gray-900">Détails</h3>
              <button
                type="button"
                onClick={closeViewModal}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              {editingType === "contact" || (!currentViewItem.hasOwnProperty("categorie") && currentSection !== "produits") ? (
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl font-extrabold text-emerald-600">
                      {(currentViewItem as Contact).nom?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-gray-900">{(currentViewItem as Contact).nom}</h4>
                      <p className="text-sm text-gray-400">{(currentViewItem as Contact).entreprise}</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                      <FaEnvelope className="text-gray-400" />
                      <span className="text-sm text-gray-700">{(currentViewItem as Contact).email}</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                      <FaPhone className="text-gray-400" />
                      <span className="text-sm text-gray-700">{(currentViewItem as Contact).telephone}</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                      <FaTag className="text-gray-400" />
                      <span className="text-sm text-gray-700">{(currentViewItem as Contact).sujet}</span>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Message</p>
                      <p className="whitespace-pre-wrap text-sm text-gray-700">{(currentViewItem as Contact).message}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-400">Créé le {formatDate((currentViewItem as Contact).created_at)}</span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold ${
                        (currentViewItem as Contact).lu ? "bg-gray-100 text-gray-500" : "bg-amber-50 text-amber-700"
                      }`}>
                        {(currentViewItem as Contact).lu ? "Lu" : "Non lu"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-2xl text-gray-400">
                      {(currentViewItem as Produit).image_url ? (
                        <img
                          src={(currentViewItem as Produit).image_url}
                          alt={(currentViewItem as Produit).nom}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FaBox />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-gray-900">{(currentViewItem as Produit).nom}</h4>
                      <p className="text-sm text-gray-400">{(currentViewItem as Produit).categorie}</p>
                    </div>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Prix</p>
                      <p className="text-sm font-bold text-gray-900">{(currentViewItem as Produit).prix.toLocaleString("fr-FR")} MGA / {(currentViewItem as Produit).unite}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Origine</p>
                      <p className="text-sm font-bold text-gray-900">{(currentViewItem as Produit).origine}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Certification</p>
                      <p className="text-sm font-bold text-emerald-700"><FaLeaf className="mr-1.5 inline text-[9px]" />{(currentViewItem as Produit).certification}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Disponible</p>
                      <p className={`text-sm font-bold ${
                        (currentViewItem as Produit).disponible ? "text-emerald-700" : "text-red-700"
                      }`}>
                        {(currentViewItem as Produit).disponible ? "Oui" : "Non"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 rounded-xl bg-gray-50 p-3">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Description</p>
                    <p className="whitespace-pre-wrap text-sm text-gray-700">{(currentViewItem as Produit).description}</p>
                  </div>
                  <p className="mt-3 text-xs text-gray-400">Créé le {formatDate((currentViewItem as Produit).created_at)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {deleteModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white border border-white/20 p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FaExclamationTriangle className="text-2xl" />
            </div>
            <h3 className="mb-2 text-lg font-extrabold text-gray-900">Confirmer la suppression</h3>
            <p className="mb-6 text-sm text-gray-400">Cette action est irréversible. Êtes-vous sûr ?</p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-red-200/50 transition-colors hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="fixed right-5 top-5 z-60 flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl px-5 py-3.5 text-white shadow-lg transition-transform duration-300 ${
              toast.type === "success"
                ? "bg-emerald-500"
                : toast.type === "error"
                ? "bg-red-500"
                : toast.type === "info"
                ? "bg-blue-500"
                : "bg-amber-500"
            }`}
          >
            <span className="text-lg">
              {toast.type === "success" ? <FaCheckCircle /> : toast.type === "error" ? <FaTimes /> : toast.type === "info" ? <FaInfoCircle /> : <FaExclamationCircle />}
            </span>
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              type="button"
              onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
              className="ml-auto text-white/70 transition-colors hover:text-white"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
