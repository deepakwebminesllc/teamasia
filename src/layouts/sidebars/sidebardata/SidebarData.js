import * as Icon from 'react-feather';
// import BootstrapIcons from '../../../views/icons/icons';

const SidebarData = [
  {
    title: 'TEAM ASIA',
    href: '/dashboards',
    id: 0,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <i className="me-2  bi bi-people-fill" />,
    collapisble: true,
    children: [
      {
        title: 'TEAM ASIA',
        href: '/dashboards/team',
        icon: <Icon.Disc />,
        id: 0.1,
        collapisble: false,
      },
      // {
      //   title: 'TAFP',
      //   href: '/dashboards/tafp',
      //   icon: <Icon.Disc />,
      //   id: 0.2,
      //   collapisble: false,
      // },
    ],
  },
  { caption: 'Features' },
  {
    title: 'ORDER MANAGEMENT',
    href: '/dashboards',
    id: 1,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <i className="me-2  bi bi-people-fill" />,
    collapisble: true,
    children: [
      {
        title: 'Customers',
        href: '/order/customers',
        icon: <Icon.Disc />,
        id: 1.1,
        collapisble: false,
      },
      {
        title: 'Orders',
        href: '/order/orders',
        icon: <Icon.Disc />,
        id: 1.2,
        collapisble: false,
      },
      {
        title: 'Factory Surplus',
        href: '/order/factory-surplus',
        icon: <Icon.Disc />,
        id: 1.3,
        collapisble: false,
      },
      {
        title: 'Order Templates',
        href: '/order/order-templates',
        icon: <Icon.Disc />,
        id: 1.4,
        collapisble: false,
      },
      
    ],
  },
  {
    title: 'OPERATIONS',
    href: '/operations',
    id: 2,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <i className="me-2 bi bi-pencil-square" />,
    collapisble: true,
    children: [
      {
        title: 'Production Plans',
        href: '/operations/production-plans',
        icon: <Icon.Disc />,
        id: 2.1,
        collapisble: false,
      },
      {
        title: 'Additional Treatment',
        href: '/operations/additional-treatment',
        icon: <Icon.Disc />,
        id: 2.2,
        collapisble: false,
      },
      {
        title: 'QA & Packaging',
        href: '/operations/qa-packaging',
        icon: <Icon.Disc />,
        id: 2.3,
        collapisble: false,
      },
      {
        title: 'Stock Management',
        href: '/operations/stock-management',
        icon: <Icon.Disc />,
        id: 2.4,
        collapisble: false,
      },
      {
        title: 'Find A Roll',
        href: '/operations/find-a-roll',
        icon: <Icon.Disc />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Dispatch',
        href: '/operations/dispatch',
        icon: <Icon.Disc />,
        id: 2.6,
        collapisble: false,
      },
      {
        title: 'Invoices',
        href: '/operations/invoices',
        icon: <Icon.Disc />,
        id: 2.7,
        collapisble: false,
      },
      // {
      //   title: 'Custom Invoices',
      //   href: '/operations/custom-invoices',
      //   icon: <Icon.Disc />,
      //   id: 2.8,
      //   collapisble: false,
      // },
      
    ],
  },
  {
    title: 'EXECUTIVE VIEW REPORTS',
    href: '/executive',
    id: 3,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <i className="me-2  bi bi-file-earmark-medical-fill" />,
    collapisble: true,
    children: [
      {
        title: 'By Order',
        href: '/executive/by-order',
        icon: <Icon.Disc />,
        id: 3.1,
        collapisble: false,
      },
      {
        title: 'By Small Roll',
        href: '/executive/by-small-roll',
        icon: <Icon.Disc />,
        id: 3.2,
        collapisble: false,
      },
      {
        title: 'Production and Sales Report',
        href: '/executive/production-sales',
        icon: <Icon.Disc />,
        id: 3.3,
        collapisble: false,
      },
      {
        title: 'GSM Analysis Report',
        href: '/executive/gsm-analysis',
        icon: <Icon.Disc />,
        id: 3.4,
        collapisble: false,
      },      
    ],
  },
  {
    title: 'PRODUCT DEVELOPMENT',
    href: '/product',
    id: 4,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <i className="me-2  bi bi-9-circle-fill" />,
    collapisble: true,
    children: [
      {
        title: 'Sample Developments',
        href: '/product/sample-developments',
        icon: <Icon.Disc />,
        id: 4.1,
        collapisble: false,
      },
     
    ],
  },
  {
    title: 'ACCOUNTS MANAGEMENT',
    href: '/accounts',
    id: 5,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <i className="me-2  bi bi-journal-text" />,
    collapisble: true,
    children: [
      {
        title: 'Payments',
        href: '/accounts/payments',
        icon: <Icon.Disc />,
        id: 5.1,
        collapisble: false,
      },
      {
        title: 'Credit Alerts',
        href: '/accounts/credit-alerts',
        icon: <Icon.Disc />,
        id: 5.2,
        collapisble: false,
      },
      {
        title: 'Ledgers',
        href: '/accounts/ledgers',
        icon: <Icon.Disc />,
        id: 5.3,
        collapisble: false,
      },
      {
        title: 'Reset All Ledgers',
        href: '/accounts/reset-all-ledgers',
        icon: <Icon.Disc />,
        id: 5.4,
        collapisble: false,
      },      
    ],
  },
  {
    title: 'INVENTORY MANAGEMENT',
    href: '/inventory',
    id: 6,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <i className="me-2  bi bi-briefcase-fill" />,
    collapisble: true,
    children: [
      {
        title: 'Vendors',
        href: '/inventory/vendors',
        icon: <Icon.Disc />,
        id: 6.1,
        collapisble: false,
      },
      {
        title: 'Categories',
        href: '/inventory/categories',
        icon: <Icon.Disc />,
        id: 6.2,
        collapisble: false,
      },
      {
        title: 'Raw Materials',
        href: '/inventory/raw-materials',
        icon: <Icon.Disc />,
        id: 6.3,
        collapisble: false,
      },
      {
        title: 'Purchases',
        href: '/inventory/purchases',
        icon: <Icon.Disc />,
        id: 6.4,
        collapisble: false,
      },
      {
        title: 'Stock Management',
        href: '/inventory/stock-management',
        icon: <Icon.Disc />,
        id: 6.5,
        collapisble: false,
      },
      {
        title: 'Find Raw Material',
        href: '/inventory/find-raw-material',
        icon: <Icon.Disc />,
        id: 6.6,
        collapisble: false,
      },
      {
        title: 'Raw Material Daily Usage',
        href: '/inventory/raw-material-daily-usage',
        icon: <Icon.Disc />,
        id: 6.7,
        collapisble: false,
      },
      {
        title: 'Stock Management Hack',
        href: '/inventory/stock-management-hack',
        icon: <Icon.Disc />,
        id: 6.8,
        collapisble: false,
      },      
    ],
  },
  {
    title: 'FACTORIES',
    href: '/factories/factory',
    icon: <i className="me-2 bi bi-buildings-fill" />,
    id: 7,
    collapisble: false,
  },
  {
    title: 'USERS',
    href: '/users/user',
    icon: <i className="me-2  bi bi-person-fill" />,
    id: 8,
    collapisble: false,
  },
  {
    title: 'ROLES',
    href: '/roles/role',
    icon: <i className="me-2  bi bi-list-stars" />,
    id: 9,
    collapisble: false,
  },
  {
    title: 'RESOURCES',
    href: '/resources',
    id: 10,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <i className="me-2 bi bi-box" />,
    collapisble: true,
    children: [
      {
        title: 'Address Types',
        href: '/resources/address-types',
        icon: <Icon.Disc />,
        id: 7.1,
        collapisble: false,
      },
      {
        title: 'BOM Coding Category',
        href: '/resources/bom-coding-category',
        icon: <Icon.Disc />,
        id: 7.2,
        collapisble: false,
      },
      {
        title: 'BOM Raw Material Category',
        href: '/resources/bom-raw-material-category',
        icon: <Icon.Disc />,
        id: 7.3,
        collapisble: false,
      },
      {
        title: 'Cities',
        href: '/resources/cities',
        icon: <Icon.Disc />,
        id: 7.4,
        collapisble: false,
      },
      {
        title: 'Colors',
        href: '/resources/colors',
        icon: <Icon.Disc />,
        id: 7.5,
        collapisble: false,
      },
      {
        title: 'Config Default',
        href: '/resources/config-default',
        icon: <Icon.Disc />,
        id: 7.6,
        collapisble: false,
      },
      {
        title: 'Countries',
        href: '/resources/countries',
        icon: <Icon.Disc />,
        id: 7.7,
        collapisble: false,
      },
      {
        title: 'Designs',
        href: '/resources/designs',
        icon: <Icon.Disc />,
        id: 7.8,
        collapisble: false,
      },
      {
        title: 'Embosses',
        href: '/resources/embosses',
        icon: <Icon.Disc />,
        id: 7.9,
        collapisble: false,
      },
      {
        title: 'Fabrics',
        href: '/resources/fabrics',
        icon: <Icon.Disc />,
        id: 7.10,
        collapisble: false,
      },
      {
        title: 'Faults',
        href: '/resources/faults',
        icon: <Icon.Disc />,
        id: 7.11,
        collapisble: false,
      },
      {
        title: 'Grades',
        href: '/resources/grades',
        icon: <Icon.Disc />,
        id: 7.12,
        collapisble: false,
      },
      {
        title: 'Grains',
        href: '/resources/grains',
        icon: <Icon.Disc />,
        id: 7.13,
        collapisble: false,
      },
      {
        title: 'HSN Codes',
        href: '/resources/hsn-codes',
        icon: <Icon.Disc />,
        id: 7.14,
        collapisble: false,
      },
      {
        title: 'InventoryTypes',
        href: '/resources/inventorytypes',
        icon: <Icon.Disc />,
        id: 7.15,
        collapisble: false,
      },
      {
        title: 'Lab Tests',
        href: '/resources/lab-tests',
        icon: <Icon.Disc />,
        id: 7.16,
        collapisble: false,
      },
      {
        title: 'Order Status',
        href: '/resources/order-status',
        icon: <Icon.Disc />,
        id: 7.17,
        collapisble: false,
      },
      {
        title: 'Paste Types',
        href: '/resources/paste-types',
        icon: <Icon.Disc />,
        id: 7.18,
        collapisble: false,
      },
      {
        title: 'QA and PE Teams',
        href: '/resources/qa-pe-teams',
        icon: <Icon.Disc />,
        id: 7.19,
        collapisble: false,
      },
      {
        title: 'Qualities',
        href: '/resources/qualities',
        icon: <Icon.Disc />,
        id: 7.20,
        collapisble: false,
      },
      {
        title: 'Severities',
        href: '/resources/severities',
        icon: <Icon.Disc />,
        id: 7.21,
        collapisble: false,
      },
      {
        title: 'Shades',
        href: '/resources/shades',
        icon: <Icon.Disc />,
        id: 7.22,
        collapisble: false,
      },
      {
        title: 'States',
        href: '/resources/states',
        icon: <Icon.Disc />,
        id: 7.23,
        collapisble: false,
      },      
    ],
  },
  { caption: 'Apps' },
  {
    title: 'Notes',
    href: '/apps/notes',
    icon: <Icon.FileText />,
    id: 2.10,
    collapisble: false,
  },
  {
    title: 'Chat',
    href: '/apps/chat',
    icon: <Icon.MessageCircle />,
    id: 2.2,
    collapisble: false,
  },
  {
    title: 'Contacts',
    href: '/apps/contacts',
    icon: <Icon.User />,
    id: 2.3,
    collapisble: false,
  },
  {
    title: 'Calendar',
    href: '/apps/calendar',
    icon: <Icon.Calendar />,
    id: 2.4,
    collapisble: false,
  },
  {
    title: 'Email',
    href: '/apps/email',
    icon: <Icon.Mail />,
    suffix: 'New',
    suffixColor: 'bg-primary rounded-pill text-dark-white',
    id: 2.5,
    collapisble: false,
  },
  {
    title: 'CASL',
    href: '/casl',
    icon: <Icon.UserCheck />,
    id: 2.6,
    collapisble: false,
  },
  {
    title: 'Ecommerce',
    href: '/ecom',
    icon: <Icon.ShoppingCart />,
    id: 2.7,
    collapisble: true,
    children: [
      {
        title: 'Shop',
        href: '/ecom/shop',
        icon: <Icon.Disc />,
      },
      {
        title: 'Shop Detail',
        href: '/ecom/shopdetail',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'Ticket',
    href: '/tickt',
    icon: <Icon.Bookmark />,
    id: 2.8,
    collapisble: true,
    children: [
      {
        title: 'Ticket List',
        href: '/tickt/ticket-list',
        icon: <Icon.Disc />,
      },
      {
        title: 'Ticket Detail',
        href: '/tickt/ticket-detail',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'TreeView',
    href: '/apps/treeview',
    icon: <Icon.Triangle />,
    id: 2.9,
    collapisble: false,
  },
  { caption: 'UI' },
  {
    title: 'UI Elements',
    href: '/ui',
    id: 2,
    suffix: '22',
    suffixColor: 'bg-info rounded-pill text-dark-white',
    icon: <Icon.Cpu />,
    collapisble: true,
    children: [
      {
        title: 'Alert',
        href: '/ui/alerts',
        icon: <Icon.Disc />,
      },
      {
        title: 'Badges',
        href: '/ui/badges',
        icon: <Icon.Disc />,
      },
      {
        title: 'Buttons',
        href: '/ui/buttons',
        icon: <Icon.Disc />,
      },
      {
        title: 'Button Group',
        href: '/ui/button-group',
        icon: <Icon.Disc />,
      },
      {
        title: 'Breadcrumbs',
        href: '/ui/breadcrumbs',
        icon: <Icon.Disc />,
      },
      {
        title: 'Cards',
        href: '/ui/cards',
        icon: <Icon.Disc />,
      },
      {
        title: 'Collapse',
        href: '/ui/collapse',
        icon: <Icon.Disc />,
      },
      {
        title: 'Dropdown',
        href: '/ui/dropdown',
        icon: <Icon.Disc />,
      },
      {
        title: 'Grid',
        href: '/ui/grid',
        icon: <Icon.Disc />,
      },
      {
        title: 'List Group',
        href: '/ui/list-group',
        icon: <Icon.Disc />,
      },
      {
        title: 'Modal',
        href: '/ui/modal',
        icon: <Icon.Disc />,
      },
      {
        title: 'Navbar',
        href: '/ui/navbar',
        icon: <Icon.Disc />,
      },
      {
        title: 'Navs',
        href: '/ui/nav',
        icon: <Icon.Disc />,
      },
      {
        title: 'Pagination',
        href: '/ui/pagination',
        icon: <Icon.Disc />,
      },
      {
        title: 'Popover',
        href: '/ui/popover',
        icon: <Icon.Disc />,
      },
      {
        title: 'Progress',
        href: '/ui/progress',
        icon: <Icon.Disc />,
      },
      {
        title: 'Spinner',
        href: '/ui/spinner',
        icon: <Icon.Disc />,
      },
      {
        title: 'Tabs',
        href: '/ui/tabs',
        icon: <Icon.Disc />,
      },
      {
        title: 'Toasts',
        href: '/ui/toasts',
        icon: <Icon.Disc />,
      },
      {
        title: 'Tooltip',
        href: '/ui/tooltip',
        icon: <Icon.Disc />,
      },
    ],
  },
  { caption: 'Forms' },
  {
    title: 'Form Layouts',
    href: '/form-layout',
    icon: <Icon.FileText />,
    id: 3.1,
    collapisble: true,
    children: [
      {
        title: 'Basic Forms',
        href: '/form-layout/form-basic',
        icon: <Icon.Disc />,
      },
      {
        title: 'Form Grid',
        href: '/form-layout/form-grid',
        icon: <Icon.Disc />,
      },
      {
        title: 'Form Group',
        href: '/form-layout/form-group',
        icon: <Icon.Disc />,
      },
      {
        title: 'Form Input',
        href: '/form-layout/form-input',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'Form Pickers',
    href: '/form-pickers',
    icon: <Icon.Droplet />,
    id: 3.2,
    collapisble: true,
    children: [
      {
        title: 'Datepicker',
        href: '/form-pickers/datepicker',
        icon: <Icon.Disc />,
      },
      {
        title: 'Tags & Select',
        href: '/form-pickers/tag-select',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'Form Validation',
    href: '/form-validation',
    icon: <Icon.CheckSquare />,
    id: 3.3,
    collapisble: false,
  },
  {
    title: 'Form Steps',
    href: '/form-steps',
    icon: <Icon.CreditCard />,
    id: 3.4,
    collapisble: false,
  },
  {
    title: 'Form Editor',
    href: '/form-editor',
    icon: <Icon.Edit />,
    id: 3.5,
    collapisble: false,
  },
  { caption: 'Tables' },
  {
    title: 'Basic Table',
    href: '/tables/basic-table',
    icon: <Icon.Codepen />,
    id: 4.1,
    collapisble: false,
  },
  {
    title: 'React Table',
    href: '/tables/react-table',
    icon: <Icon.Disc />,
    id: 4.2,
    collapisble: false,
  },
  {
    title: 'Bootstrap Datatable',
    href: '/tables/data-table',
    icon: <Icon.HardDrive />,
    id: 4.3,
    collapisble: false,
  },
  { caption: 'Charts' },
  {
    title: 'Apexchart',
    href: '/charts/apex',
    icon: <Icon.Loader />,
    id: 5.1,
    collapisble: false,
  },
  {
    title: 'ChartJs',
    href: '/charts/chartjs',
    icon: <Icon.PieChart />,
    id: 5.2,
    collapisble: false,
  },
  { caption: 'Extra' },
  {
    title: 'Sample Pages',
    href: '/sample-pages',
    icon: <Icon.BookOpen />,
    id: 6.1,
    collapisble: true,
    children: [
      {
        title: 'Starterkit',
        href: '/sample-pages/starterkit',
        icon: <Icon.Disc />,
      },
      {
        title: 'Profile',
        href: '/sample-pages/profile',
        icon: <Icon.Disc />,
      },
      {
        title: 'Search Result',
        href: '/sample-pages/search-result',
        icon: <Icon.Disc />,
      },
      {
        title: 'Gallery',
        href: '/sample-pages/gallery',
        icon: <Icon.Disc />,
      },
      {
        title: 'Helper Class',
        href: '/sample-pages/helper-class',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'Widget',
    href: '/widget',
    icon: <Icon.Grid />,
    id: 6.4,
    collapisble: false,
  },
  {
    title: 'Icons',
    href: '/icons',
    icon: <Icon.Feather />,
    id: 6.2,
    collapisble: true,
    children: [
      {
        title: 'Bootstrap',
        href: '/icons/bootstrap',
        icon: <Icon.Disc />,
      },
      {
        title: 'Feather',
        href: '/icons/feather',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'Vector Map',
    href: '/map/vector',
    icon: <Icon.Map />,
    id: 6.3,
    collapisble: false,
  },
  {
    title: 'Authentication',
    href: '/auth',
    icon: <Icon.Lock />,
    id: 6.5,
    collapisble: true,
    children: [
      {
        title: 'Login',
        href: '/auth/loginformik',
        icon: <Icon.Disc />,
      },
      {
        title: 'Register',
        href: '/auth/registerformik',
        icon: <Icon.Disc />,
      },
      {
        title: 'Maintanance',
        href: '/auth/maintanance',
        icon: <Icon.Disc />,
      },
      {
        title: 'Lockscreen',
        href: '/auth/lockscreen',
        icon: <Icon.Disc />,
      },
      {
        title: 'Recover Password',
        href: '/auth/recoverpwd',
        icon: <Icon.Disc />,
      },
      {
        title: 'Error',
        href: '/auth/404',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'DD Menu',
    href: '/',
    id: 7,
    collapisble: true,
    icon: <Icon.Disc />,
    children: [
      {
        title: 'Simple dd 1',
        href: '/',
        icon: <Icon.Disc />,
      },
      {
        title: 'Simple dd 2',
        href: '/',
        icon: <Icon.Disc />,
      },
      {
        title: 'Simple dd 3',
        href: '/',
        icon: <Icon.Disc />,
        children: [
          {
            title: 'Simple dd 1.1',
            href: '/alerts',
            icon: <Icon.Disc />,
          },
        ],
      },
    ],
  },
];

export default SidebarData;
