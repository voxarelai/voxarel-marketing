import {
  User,
  Warehouse,
  Building2,
  DollarSign,
  BarChart3,
  Truck,
  UserPlus,
  ShoppingCart,
  FileText,
  WifiOff,
  Printer,
  PackageCheck,
  Scale,
  ScanLine,
  ClipboardList,
  Container,
  LayoutDashboard,
  Users,
  Banknote,
  AlertTriangle,
  UserCog,
  Sliders,
  TrendingUp,
  GitCompare,
  Box,
  Download,
  MapPin,
  Route,
  Bell,
  Camera,
  LucideIcon,
} from "lucide-react";

export type VisualizationType = "packages" | "containers" | "analytics" | "workflow" | "dataflow" | "orbit" | "awbtree" | "offlinesync" | "labelattach";

export interface RoleFeature {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  visualizationType: VisualizationType;
}

export interface Role {
  id: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  color: "orange" | "cyan" | "purple" | "green" | "blue" | "amber";
  features: RoleFeature[];
}

export const roles: Role[] = [
  {
    id: "field-agent",
    title: "Field Agent",
    icon: User,
    tagline: "Process 60+ packages daily",
    color: "orange",
    features: [
      {
        id: "customer-capture",
        label: "Customer Capture",
        icon: UserPlus,
        description: "Mobile customer form with Google Maps integration and auto-fill",
        visualizationType: "dataflow",
      },
      {
        id: "package-cart",
        label: "Package Cart",
        icon: ShoppingCart,
        description: "Multi-package shopping cart with drag-and-drop management",
        visualizationType: "orbit",
      },
      {
        id: "awb-generation",
        label: "AWB Generation",
        icon: FileText,
        description: "Master & child AWB tracking numbers (S-DXB-00001)",
        visualizationType: "awbtree",
      },
      {
        id: "offline-mode",
        label: "Offline Mode",
        icon: WifiOff,
        description: "Offline-first data capture with automatic sync when online",
        visualizationType: "offlinesync",
      },
      {
        id: "label-printing",
        label: "Label Printing",
        icon: Printer,
        description: "Stage 1 label printing at collection point with scan-back",
        visualizationType: "labelattach",
      },
    ],
  },
  {
    id: "warehouse",
    title: "Warehouse",
    icon: Warehouse,
    tagline: "Scan-driven efficiency",
    color: "cyan",
    features: [
      {
        id: "package-receiving",
        label: "Package Receiving",
        icon: PackageCheck,
        description: "Barcode scanner with AWB lookup and auto-identification",
        visualizationType: "packages",
      },
      {
        id: "reweigh-measure",
        label: "Re-Weigh & Measure",
        icon: Scale,
        description: "Weight verification with >5% variance detection and alerts",
        visualizationType: "packages",
      },
      {
        id: "scan-workflows",
        label: "Scan Workflows",
        icon: ScanLine,
        description: "Continuous batch scanning with 500ms response time",
        visualizationType: "workflow",
      },
      {
        id: "manifest-creation",
        label: "Manifest Creation",
        icon: ClipboardList,
        description: "100% scan verification required before manifest closure",
        visualizationType: "workflow",
      },
      {
        id: "container-loading",
        label: "Container Loading",
        icon: Container,
        description: "Space utilization tracking with priority reordering",
        visualizationType: "containers",
      },
    ],
  },
  {
    id: "branch",
    title: "Branch Manager",
    icon: Building2,
    tagline: "Complete branch oversight",
    color: "purple",
    features: [
      {
        id: "branch-dashboard",
        label: "Branch Dashboard",
        icon: LayoutDashboard,
        description: "6-section unified dashboard with real-time KPIs",
        visualizationType: "analytics",
      },
      {
        id: "field-operations",
        label: "Field Operations",
        icon: Users,
        description: "Agent activity monitoring and daily collection targets",
        visualizationType: "analytics",
      },
      {
        id: "warehouse-oversight",
        label: "Warehouse Oversight",
        icon: Warehouse,
        description: "Receiving queue status and manifest tracking",
        visualizationType: "containers",
      },
      {
        id: "financial-management",
        label: "Financial Management",
        icon: DollarSign,
        description: "Invoice approval, payment tracking, and VAT calculation",
        visualizationType: "analytics",
      },
      {
        id: "cash-reconciliation",
        label: "Cash Reconciliation",
        icon: Banknote,
        description: "End-of-day cash balancing with discrepancy reporting",
        visualizationType: "analytics",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    icon: BarChart3,
    tagline: "Cross-branch control",
    color: "green",
    features: [
      {
        id: "multi-branch-view",
        label: "Multi-Branch View",
        icon: Building2,
        description: "Cross-branch operations overview with reconciliation status",
        visualizationType: "analytics",
      },
      {
        id: "discrepancy-resolution",
        label: "Discrepancy Resolution",
        icon: AlertTriangle,
        description: "View and resolve flagged issues with audit trail",
        visualizationType: "workflow",
      },
      {
        id: "user-management",
        label: "User Management",
        icon: UserCog,
        description: "Create and manage users across all branches",
        visualizationType: "analytics",
      },
      {
        id: "rate-management",
        label: "Rate Management",
        icon: Sliders,
        description: "Configure shipping rates and surcharge rules",
        visualizationType: "analytics",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        description: "Shipment volume and container utilization reporting",
        visualizationType: "analytics",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    icon: DollarSign,
    tagline: "Executive insights",
    color: "blue",
    features: [
      {
        id: "revenue-analytics",
        label: "Revenue Analytics",
        icon: TrendingUp,
        description: "Sales revenue reporting with trend visualization",
        visualizationType: "analytics",
      },
      {
        id: "branch-comparison",
        label: "Branch Comparison",
        icon: GitCompare,
        description: "Performance metrics and benchmarking across branches",
        visualizationType: "analytics",
      },
      {
        id: "container-metrics",
        label: "Container Metrics",
        icon: Box,
        description: "Fill rates, optimization insights, and predictive accuracy",
        visualizationType: "containers",
      },
      {
        id: "data-export",
        label: "Data Export",
        icon: Download,
        description: "Export reports and integrate with accounting software",
        visualizationType: "analytics",
      },
    ],
  },
  {
    id: "rider",
    title: "Rider",
    icon: Truck,
    tagline: "Last-mile delivery",
    color: "amber",
    features: [
      {
        id: "delivery-tracking",
        label: "Delivery Tracking",
        icon: MapPin,
        description: "Real-time delivery location with customer notifications",
        visualizationType: "workflow",
      },
      {
        id: "route-optimization",
        label: "Route Optimization",
        icon: Route,
        description: "AI-optimized delivery routes for maximum efficiency",
        visualizationType: "workflow",
      },
      {
        id: "status-updates",
        label: "Status Updates",
        icon: Bell,
        description: "Push notifications for new assignments and updates",
        visualizationType: "workflow",
      },
      {
        id: "pod-capture",
        label: "POD Capture",
        icon: Camera,
        description: "Proof of delivery photo capture with timestamp",
        visualizationType: "packages",
      },
    ],
  },
];

// Color classes for each role
export const roleColors = {
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    accent: "#f97316",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    accent: "#06b6d4",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    accent: "#a855f7",
  },
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    accent: "#10b981",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    accent: "#3b82f6",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    accent: "#f59e0b",
  },
};
