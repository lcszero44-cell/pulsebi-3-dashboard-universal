import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import * as XLSX from 'xlsx'
import {
  LayoutDashboard, Upload, Clipboard, FolderOpen, Globe, Palette, Building2, Image,
  ChevronLeft, ChevronRight, X, Plus, Trash2, Edit, Download, FileText,
  BarChart3, TrendingUp, Target, List, Settings, RefreshCw, Eye, Maximize2,
  Minimize2, Undo2, RotateCcw, Filter, Search, Zap, Sparkles,
  Menu, X as XIcon, Sun, Moon, ChevronDown, Save, Loader2,
  ChevronUp, ChevronDown as ChevronDownIcon
} from 'lucide-react'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip as ChartTooltip, Legend, Filler, RadialLinearScale
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, ChartTooltip, Legend, Filler, RadialLinearScale
)

// ============================================
// TEMA & PALETAS
// ============================================
const PALETTES = [
  { id: 'navy', name: 'Executivo Navy', icon: '🌊' },
  { id: 'neon', name: 'Roxo Neon', icon: '💜' },
  { id: 'emerald', name: 'Esmeralda BI', icon: '💚' },
  { id: 'light', name: 'Claro Corporativo', icon: '☀️' },
]

const DEMO_DATASETS = {
  'comercio': {
    name: 'Comércio & Vendas',
    data: [
      { Data: '2024-01-15', Produto: 'Notebook Dell', Categoria: 'Eletrônicos', Valor: 3500.00, Quantidade: 2, Vendedor: 'João' },
      { Data: '2024-01-18', Produto: 'Mouse Logitech', Categoria: 'Acessórios', Valor: 150.00, Quantidade: 10, Vendedor: 'Maria' },
      { Data: '2024-01-20', Produto: 'Monitor LG 27"', Categoria: 'Monitores', Valor: 1200.00, Quantidade: 3, Vendedor: 'Pedro' },
      { Data: '2024-01-22', Produto: 'Teclado Mecânico', Categoria: 'Acessórios', Valor: 450.00, Quantidade: 5, Vendedor: 'Ana' },
      { Data: '2024-01-25', Produto: 'iPhone 15', Categoria: 'Smartphones', Valor: 5500.00, Quantidade: 1, Vendedor: 'Carlos' },
      { Data: '2024-02-01', Produto: 'Headset Gamer', Categoria: 'Acessórios', Valor: 380.00, Quantidade: 8, Vendedor: 'João' },
      { Data: '2024-02-05', Produto: 'SSD 1TB', Categoria: 'Armazenamento', Valor: 450.00, Quantidade: 12, Vendedor: 'Maria' },
      { Data: '2024-02-10', Produto: 'Webcam HD', Categoria: 'Acessórios', Valor: 280.00, Quantidade: 6, Vendedor: 'Pedro' },
      { Data: '2024-02-14', Produto: 'Cadeira Gamer', Categoria: 'Móveis', Valor: 1200.00, Quantidade: 2, Vendedor: 'Ana' },
      { Data: '2024-02-18', Produto: 'Mesa Escritório', Categoria: 'Móveis', Valor: 850.00, Quantidade: 3, Vendedor: 'Carlos' },
    ]
  },
  'clinica': {
    name: 'Clínica & Atendimentos',
    data: [
      { Data: '2024-01-10', Paciente: 'Ana Silva', Procedimento: 'Consulta Odontológica', Categoria: 'Odontologia', Valor: 250.00, Profissional: 'Dr. João' },
      { Data: '2024-01-12', Paciente: 'Carlos Lima', Procedimento: 'Clareamento Dental', Categoria: 'Odontologia', Valor: 800.00, Profissional: 'Dra. Maria' },
      { Data: '2024-01-15', Paciente: 'Beatriz Costa', Procedimento: 'Botox', Categoria: 'Estética', Valor: 450.00, Profissional: 'Dr. Pedro' },
      { Data: '2024-01-18', Paciente: 'Roberto Alves', Procedimento: 'Implante Dentário', Categoria: 'Odontologia', Valor: 3500.00, Profissional: 'Dr. João' },
      { Data: '2024-01-20', Paciente: 'Fernanda Dias', Procedimento: 'Preenchimento Labial', Categoria: 'Estética', Valor: 800.00, Profissional: 'Dra. Maria' },
      { Data: '2024-01-22', Paciente: 'Lucas Mendes', Procedimento: 'Limpeza e Profilaxia', Categoria: 'Odontologia', Valor: 250.00, Profissional: 'Dr. Pedro' },
      { Data: '2024-02-01', Paciente: 'Juliana Rocha', Procedimento: 'Harmonização Facial', Categoria: 'Estética', Valor: 2500.00, Profissional: 'Dr. Pedro' },
      { Data: '2024-02-05', Paciente: 'Ricardo Souza', Procedimento: 'Aparelho Ortodôntico', Categoria: 'Odontologia', Valor: 2500.00, Profissional: 'Dr. João' },
      { Data: '2024-02-08', Paciente: 'Patrícia Lima', Procedimento: 'Peeling Químico', Categoria: 'Estética', Valor: 350.00, Profissional: 'Dra. Maria' },
      { Data: '2024-02-12', Paciente: 'Marcos Paulo', Procedimento: 'Tratamento de Canal', Categoria: 'Odontologia', Valor: 600.00, Profissional: 'Dr. Pedro' },
    ]
  },
  'logistica': {
    name: 'Logística & Entregas',
    data: [
      { Data: '2024-01-05', Rota: 'São Paulo → Rio de Janeiro', Veículo: 'Caminhão 3/4', Categoria: 'Interestadual', Valor: 1200.00, Peso: 2500, Status: 'Entregue' },
      { Data: '2024-01-08', Rota: 'São Paulo → Campinas', Veículo: 'Van', Categoria: 'Regional', Valor: 350.00, Peso: 800, Status: 'Entregue' },
      { Data: '2024-01-10', Rota: 'Rio → Belo Horizonte', Veículo: 'Carreta', Categoria: 'Interestadual', Valor: 2800.00, Peso: 12000, Status: 'Em Trânsito' },
      { Data: '2024-01-12', Rota: 'São Paulo → Santos', Veículo: 'Caminhão 3/4', Categoria: 'Regional', Valor: 450.00, Peso: 1500, Status: 'Entregue' },
      { Data: '2024-01-15', Rota: 'Brasília → Goiânia', Veículo: 'Carreta', Categoria: 'Interestadual', Valor: 1800.00, Peso: 8000, Status: 'Entregue' },
      { Data: '2024-01-18', Rota: 'São Paulo → Curitiba', Veículo: 'Carreta', Categoria: 'Interestadual', Valor: 2200.00, Peso: 10000, Status: 'Atrasado' },
      { Data: '2024-02-01', Rota: 'São Paulo → Ribeirão Preto', Veículo: 'Van', Categoria: 'Regional', Valor: 400.00, Peso: 600, Status: 'Entregue' },
      { Data: '2024-02-03', Rota: 'Rio → Vitória', Veículo: 'Caminhão 3/4', Categoria: 'Interestadual', Valor: 900.00, Peso: 3000, Status: 'Entregue' },
      { Data: '2024-02-05', Rota: 'São Paulo → Jundiaí', Veículo: 'Van', Categoria: 'Regional', Valor: 280.00, Peso: 400, Status: 'Entregue' },
      { Data: '2024-02-08', Rota: 'Belo Horizonte → Uberlândia', Veículo: 'Carreta', Categoria: 'Interestadual', Valor: 1500.00, Peso: 7000, Status: 'Em Trânsito' },
    ]
  },
  'financeiro': {
    name: 'Financeiro & Fluxo de Caixa',
    data: [
      { Data: '2024-01-02', Descrição: 'Receita Vendas Janeiro', Categoria: 'Receita', Tipo: 'Entrada', Valor: 45000.00, Conta: 'Banco Principal' },
      { Data: '2024-01-05', Descrição: 'Pagamento Fornecedores', Categoria: 'Fornecedores', Tipo: 'Saída', Valor: 12000.00, Conta: 'Banco Principal' },
      { Data: '2024-01-08', Descrição: 'Salários Equipe', Categoria: 'Folha', Tipo: 'Saída', Valor: 25000.00, Conta: 'Banco Principal' },
      { Data: '2024-01-10', Descrição: 'Receita Consultoria', Categoria: 'Serviços', Tipo: 'Entrada', Valor: 8500.00, Conta: 'Banco Secundário' },
      { Data: '2024-01-15', Descrição: 'Aluguel Escritório', Categoria: 'Imóvel', Tipo: 'Saída', Valor: 5000.00, Conta: 'Banco Principal' },
      { Data: '2024-01-18', Descrição: 'Marketing Digital', Categoria: 'Marketing', Tipo: 'Saída', Valor: 3500.00, Conta: 'Banco Principal' },
      { Data: '2024-01-20', Descrição: 'Receita Produtos', Categoria: 'Vendas', Tipo: 'Entrada', Valor: 18000.00, Conta: 'Banco Principal' },
      { Data: '2024-01-22', Descrição: 'Impostos', Categoria: 'Tributos', Tipo: 'Saída', Valor: 7200.00, Conta: 'Banco Principal' },
      { Data: '2024-02-01', Descrição: 'Receita Fevereiro', Categoria: 'Vendas', Tipo: 'Entrada', Valor: 52000.00, Conta: 'Banco Principal' },
      { Data: '2024-02-05', Descrição: 'Equipamentos TI', Categoria: 'Investimento', Tipo: 'Saída', Valor: 15000.00, Conta: 'Banco Secundário' },
    ]
  }
}

// ============================================
// UTILITÁRIOS BRASILEIROS
// ============================================
const parseBrazilianNumber = (val) => {
  if (val === null || val === undefined || val === '') return null
  if (typeof val === 'number') return val
  const str = String(val).trim()
  const cleaned = str
    .replace(/[R$\s]/g, '')
    .replace(/\.(?=\d{3}([,.]|$))/g, '')
    .replace(',', '.')
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

const parseBrazilianDate = (val) => {
  if (!val) return null
  if (val instanceof Date) return val
  if (typeof val === 'number') {
    const excelEpoch = new Date(1900, 0, 1)
    const date = new Date(excelEpoch.getTime() + (val - 2) * 86400000)
    return date
  }
  const str = String(val).trim()
  const match1 = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/)
  if (match1) return new Date(match1[3], match1[2] - 1, match1[1])
  const match2 = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/)
  if (match2) return new Date(match2[1], match2[2] - 1, match2[3])
  const date = new Date(str)
  return isNaN(date.getTime()) ? null : date
}

const formatBRL = (val) => {
  if (val === null || val === undefined) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
}

const formatNumber = (val, decimals = 0) => {
  if (val === null || val === undefined) return '0'
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(val)
}

const detectColumnType = (values) => {
  const sample = values.filter(v => v !== null && v !== undefined && v !== '').slice(0, 50)
  if (sample.length === 0) return 'text'

  let dateCount = 0, numberCount = 0, currencyCount = 0

  sample.forEach(v => {
    const str = String(v).trim()
    if (parseBrazilianDate(v)) dateCount++
    else if (parseBrazilianNumber(v) !== null) {
      numberCount++
      if (str.includes('R$') || str.startsWith('$') || /^\d{1,3}(\.\d{3})*,\d{2}$/.test(str)) currencyCount++
    }
  })

  const total = sample.length
  if (dateCount / total > 0.6) return 'date'
  if (currencyCount / total > 0.5) return 'currency'
  if (numberCount / total > 0.6) return 'number'
  return 'text'
}

// ============================================
// COMPONENTES UI (nível de módulo)
// ============================================

const Button = ({ children, variant = 'primary', size = 'md', className = '', disabled, onClick, ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
  const variants = {
    primary: 'bg-navy-accent text-navy-bg hover:bg-navy-accent/90 focus:ring-navy-accent',
    secondary: 'bg-navy-card text-navy-text border border-navy-border hover:bg-navy-border focus:ring-navy-border',
    ghost: 'bg-transparent text-navy-textMuted hover:bg-navy-border hover:text-navy-text focus:ring-navy-border',
    danger: 'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 focus:ring-red-500',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = '', hover, ...props }) => (
  <div className={`bg-navy-card/80 backdrop-blur-sm border border-navy-border rounded-2xl p-6 shadow-card transition-all duration-300 ${hover ? 'hover:shadow-card-hover hover:-translate-y-1 hover:border-navy-accent/30' : ''} ${className}`} {...props}>
    {children}
  </div>
)

const Input = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-navy-textMuted mb-1.5">{label}</label>}
    <input className={`w-full px-4 py-2.5 bg-navy-bg border rounded-lg text-navy-text placeholder-navy-textMuted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-accent focus:border-transparent ${error ? 'border-red-500' : 'border-navy-border'} ${className}`} {...props} />
    {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
  </div>
)

const Select = ({ label, options, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-navy-textMuted mb-1.5">{label}</label>}
    <select className={`w-full px-4 py-2.5 pr-10 bg-navy-bg border border-navy-border rounded-lg text-navy-text appearance-none bg-no-repeat bg-right transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-accent focus:border-transparent ${className}`} {...props}>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
)

const Badge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    info: 'bg-navy-accentDim text-navy-accent border border-navy-accent/30',
    success: 'bg-emerald-accentDim text-emerald-accent border border-emerald-accent/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
  }
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>{children}</span>
}

const Modal = ({ isOpen, onClose, title, children, size = 'md', showClose = true }) => {
  if (!isOpen) return null
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`${sizes[size]} w-full bg-navy-card border border-navy-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-navy-border sticky top-0 bg-navy-card/95 backdrop-blur-sm z-10">
          <h3 className="text-lg font-semibold text-navy-text">{title}</h3>
          {showClose && <Button variant="ghost" size="sm" onClick={onClose}><X size={20} /></Button>}
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  )
}

const HoverTooltip = ({ content, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }
  return (
    <div className="relative inline-flex" ref={ref} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className={`absolute ${positions[position]} px-3 py-2 bg-navy-card border border-navy-border rounded-lg text-sm text-navy-text shadow-lg z-50 whitespace-nowrap animate-fade-in`}>
          {content}
        </div>
      )}
    </div>
  )
}

const Sparkline = ({ data, color = 'navy-accent', height = 40 }) => {
  if (!data || data.length === 0) return <div className="h-16 w-full" />
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100}%,${100 - ((v - min) / range) * 100}%`).join(' ')
  return (
    <svg className="w-full" height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill="url(#sparkline-gradient)" />
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
    </svg>
  )
}

const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

// ============================================
// GRÁFICOS CHART.JS
// ============================================

const getChartColors = (palette) => {
  const themes = {
    navy: { primary: '#00d4ff', grid: '#1a2a4a', text: '#88a0c8', bg: '#0d152a' },
    neon: { primary: '#bc6cff', grid: '#2d1b4e', text: '#b890d8', bg: '#1a0d2e' },
    emerald: { primary: '#00ff88', grid: '#0f3d2e', text: '#70c898', bg: '#08241c' },
    light: { primary: '#4f46e5', grid: '#e2e8f0', text: '#64748b', bg: '#ffffff' },
  }
  return themes[palette] || themes.navy
}

const ChartContainer = ({ children, title, action, className = '' }) => (
  <Card className={`${className} relative`}>
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-semibold text-navy-text">{title}</h4>
      {action}
    </div>
    <div className="h-64 w-full">{children}</div>
  </Card>
)

const EvolutionChart = ({ data, metric, groupBy, palette, chartType, onTypeChange }) => {
  const colors = getChartColors(palette)
  const groups = [...new Set(data.map(d => d[groupBy]))].slice(0, 8)
  const sortedData = [...data].sort((a, b) => new Date(a.Data) - new Date(b.Data))

  const datasets = groups.map((g, i) => {
    const groupData = sortedData.filter(d => d[groupBy] === g)
    const hue = (i * 360 / groups.length)
    const clr = `hsl(${hue}, 70%, 55%)`
    return {
      label: g,
      data: groupData.map(d => parseBrazilianNumber(d[metric]) || 0),
      borderColor: clr,
      backgroundColor: clr + '33',
      tension: chartType === 'line' ? 0 : chartType === 'area' ? 0.4 : 0,
      fill: chartType === 'area',
      pointRadius: 4,
      pointHoverRadius: 6,
    }
  })

  const labels = [...new Set(sortedData.map(d => {
    const date = new Date(d.Data)
    return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })
  }))]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: true, position: 'bottom', labels: { color: colors.text, usePointStyle: true, padding: 16 } },
      tooltip: { backgroundColor: colors.bg, titleColor: colors.text, bodyColor: colors.text, borderColor: colors.grid, borderWidth: 1, padding: 12, cornerRadius: 8 }
    },
    scales: {
      x: { grid: { color: colors.grid }, ticks: { color: colors.text } },
      y: { grid: { color: colors.grid }, ticks: { color: colors.text, callback: v => formatBRL(v) } }
    }
  }

  return (
    <ChartContainer title="Evolução ao Longo do Tempo" action={
      <div className="flex gap-1 bg-navy-bg rounded-lg p-1">
        {['area', 'line', 'bar'].map(t => (
          <button key={t} onClick={() => onTypeChange(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${chartType === t ? 'bg-navy-accent text-navy-bg' : 'text-navy-textMuted hover:text-navy-text'}`}>
            {t === 'area' ? 'Ondulado' : t === 'line' ? 'Reto' : 'Colunas'}
          </button>
        ))}
      </div>
    }>
      <Bar data={{ labels, datasets }} options={options} />
    </ChartContainer>
  )
}

const GaugeChart = ({ data, metric, groupBy, palette, target, onTargetChange }) => {
  const colors = getChartColors(palette)
  const groups = [...new Set(data.map(d => d[groupBy]))]
  const current = groups.reduce((sum, g) => {
    const groupData = data.filter(d => d[groupBy] === g)
    return sum + groupData.reduce((s, d) => s + (parseBrazilianNumber(d[metric]) || 0), 0)
  }, 0)
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0

  return (
    <ChartContainer title="Meta vs. Realizado" action={
      <div className="flex items-center gap-2">
        <label className="text-sm text-navy-textMuted">Meta:</label>
        <Input type="number" value={target} onChange={e => onTargetChange(parseFloat(e.target.value) || 0)} className="w-32" placeholder="0" />
      </div>
    }>
      <div className="flex flex-col items-center justify-center h-64">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
            <circle cx="100" cy="100" r="85" stroke={colors.grid} strokeWidth="12" fill="none" />
            <circle
              cx="100" cy="100" r="85"
              stroke={percentage >= 100 ? '#00ff88' : colors.primary}
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 85 * (percentage / 100)} ${2 * Math.PI * 85}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-navy-text">{percentage.toFixed(1)}%</span>
            <span className="text-sm text-navy-textMuted">Atingido</span>
          </div>
        </div>
        <div className="mt-4 text-center space-y-1">
          <p className="text-navy-textMuted">Realizado: <span className="text-navy-text font-medium">{formatBRL(current)}</span></p>
          <p className="text-navy-textMuted">Meta: <span className="text-navy-text font-medium">{formatBRL(target)}</span></p>
          <p className={target > current ? 'text-red-400' : 'text-emerald-accent'}>
            {target > current ? `Faltam: ${formatBRL(target - current)}` : `Superavit: ${formatBRL(current - target)}`}
          </p>
        </div>
      </div>
    </ChartContainer>
  )
}

const RankingChart = ({ data, metric, groupBy, palette, onBarClick, filteredGroup }) => {
  const colors = getChartColors(palette)
  const agg = data.reduce((acc, d) => {
    const key = d[groupBy]
    const val = parseBrazilianNumber(d[metric]) || 0
    acc[key] = (acc[key] || 0) + val
    return acc
  }, {})

  const sorted = Object.entries(agg).sort((a, b) => b[1] - a[1]).slice(0, 10)
  const labels = sorted.map(([k]) => k)
  const values = sorted.map(([, v]) => v)
  const isFiltered = filteredGroup ? labels.map(l => l === filteredGroup) : null

  const handleClick = (e, elements) => {
    if (elements.length > 0) {
      const idx = elements[0].index
      onBarClick(labels[idx])
    }
  }

  return (
    <ChartContainer title="Ranking Top 10" action={
      filteredGroup && <Button variant="ghost" size="sm" onClick={() => onBarClick(null)}>Limpar Filtro</Button>
    }>
      <Bar
        data={{
          labels,
          datasets: [{
            data: values,
            backgroundColor: isFiltered ? isFiltered.map(f => f ? colors.primary : colors.grid) : colors.primary,
            borderRadius: 8,
            borderSkipped: false,
          }]
        }}
        options={{
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          onClick: handleClick,
          plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: colors.bg, titleColor: colors.text, bodyColor: colors.text, borderColor: colors.grid, borderWidth: 1, padding: 12, cornerRadius: 8, callbacks: { label: ctx => formatBRL(ctx.raw) } }
          },
          scales: {
            x: { grid: { color: colors.grid }, ticks: { color: colors.text, callback: v => formatBRL(v) } },
            y: { grid: { display: false }, ticks: { color: colors.text, font: { size: 11 } } }
          }
        }}
      />
    </ChartContainer>
  )
}

const ParticipationChart = ({ data, metric, groupBy, palette, onSliceClick, filteredGroup }) => {
  const colors = getChartColors(palette)
  const agg = data.reduce((acc, d) => {
    const key = d[groupBy]
    const val = parseBrazilianNumber(d[metric]) || 0
    acc[key] = (acc[key] || 0) + val
    return acc
  }, {})

  const sorted = Object.entries(agg).sort((a, b) => b[1] - a[1])
  const labels = sorted.map(([k]) => k)
  const values = sorted.map(([, v]) => v)
  const total = values.reduce((a, b) => a + b, 0)

  const hueStep = 360 / labels.length
  const bgColors = labels.map((_, i) => `hsl(${i * hueStep}, 70%, 55%)`)
  const isFiltered = filteredGroup ? labels.map(l => l === filteredGroup) : null

  const handleClick = (e, elements) => {
    if (elements.length > 0) {
      const idx = elements[0].index
      onSliceClick(labels[idx])
    }
  }

  return (
    <ChartContainer title="Participação (%)" action={
      filteredGroup && <Button variant="ghost" size="sm" onClick={() => onSliceClick(null)}>Limpar Filtro</Button>
    }>
      <div className="flex items-center justify-center h-64 gap-8">
        <Doughnut
          data={{
            labels,
            datasets: [{
              data: values,
              backgroundColor: isFiltered ? isFiltered.map(f => f ? bgColors[labels.indexOf(f)] : colors.grid) : bgColors,
              borderWidth: 3,
              borderColor: colors.bg,
              borderRadius: 8,
              hoverOffset: 12,
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            onClick: handleClick,
            cutout: '65%',
            plugins: {
              legend: { display: true, position: 'right', labels: { color: colors.text, usePointStyle: true, padding: 12, font: { size: 11 } } },
              tooltip: { backgroundColor: colors.bg, titleColor: colors.text, bodyColor: colors.text, borderColor: colors.grid, borderWidth: 1, padding: 12, cornerRadius: 8, callbacks: { label: ctx => `${ctx.label}: ${formatBRL(ctx.raw)} (${((ctx.raw / total) * 100).toFixed(1)}%)` } }
            }
          }}
        />
        <div className="text-center min-w-[120px]">
          <p className="text-4xl font-bold text-navy-text">{formatBRL(total)}</p>
          <p className="text-navy-textMuted text-sm">Total Geral</p>
        </div>
      </div>
    </ChartContainer>
  )
}

// ============================================
// KPI CARD
// ============================================

const KPICardComponent = ({ title, value, sparkline, variation, icon }) => (
  <Card className="kpi-card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-navy-textMuted">{title}</p>
        <p className="text-3xl font-bold text-navy-text mt-1">{value}</p>
        {sparkline && sparkline.length > 1 && <Sparkline data={sparkline} height={30} className="mt-2" />}
      </div>
      <div className="p-2 bg-navy-accentDim rounded-xl">{icon}</div>
    </div>
    {variation !== undefined && (
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={variation >= 0 ? 'text-emerald-accent' : 'text-red-400'}>
          {variation >= 0 ? '↑' : '↓'} {Math.abs(variation).toFixed(1)}%
        </span>
        <span className="text-navy-textMuted">vs. período anterior</span>
      </div>
    )}
  </Card>
)

// ============================================
// COMPONENTE PRINCIPAL APP
// ============================================

export default function App() {
  const [rawData, setRawData] = useState([])
  const [columns, setColumns] = useState([])
  const [columnTypes, setColumnTypes] = useState({})
  const [filters, setFilters] = useState({ metric: '', groupBy: '', search: '', valueRange: [null, null], slicer: null })
  const [palette, setPalette] = useState('navy')
  const [companyName, setCompanyName] = useState('PulseBI 3.0')
  const [logo, setLogo] = useState(null)
  const [target, setTarget] = useState(0)
  const [chartType, setChartType] = useState('area')
  const [rankingFilter, setRankingFilter] = useState(null)
  const [participationFilter, setParticipationFilter] = useState(null)
  const [showBrandModal, setShowBrandModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [tvMode, setTvMode] = useState(false)
  const [history, setHistory] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [newRowData, setNewRowData] = useState({})
  const [editingRow, setEditingRow] = useState(null)
  const [editingCell, setEditingCell] = useState(null)
  const [importMethod, setImportMethod] = useState('file')
  const [pasteText, setPasteText] = useState('')
  const [gsheetUrl, setGsheetUrl] = useState('')
  const [watchingFolder, setWatchingFolder] = useState(false)
  const [folderHandle, setFolderHandle] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pulsebi3') || '{}')
      if (saved.data) setRawData(saved.data)
      if (saved.columns) setColumns(saved.columns)
      if (saved.columnTypes) setColumnTypes(saved.columnTypes)
      if (saved.palette) setPalette(saved.palette)
      if (saved.companyName) setCompanyName(saved.companyName)
      if (saved.logo) setLogo(saved.logo)
      if (saved.target) setTarget(saved.target)
      if (saved.chartType) setChartType(saved.chartType)
    } catch (e) { console.warn('Erro ao carregar localStorage:', e) }
  }, [])

  useEffect(() => {
    const toSave = { data: rawData, columns, columnTypes, palette, companyName, logo, target, chartType }
    localStorage.setItem('pulsebi3', JSON.stringify(toSave))
  }, [rawData, columns, columnTypes, palette, companyName, logo, target, chartType])

  useEffect(() => {
    if (!watchingFolder || !folderHandle) return
    const interval = setInterval(async () => {
      try {
        for await (const entry of folderHandle.values()) {
          if (entry.kind === 'file' && /\.(xlsx|csv|json)$/i.test(entry.name)) {
            const file = await entry.getFile()
            const buffer = await file.arrayBuffer()
            const workbook = XLSX.read(buffer, { type: 'array' })
            const sheet = workbook.Sheets[workbook.SheetNames[0]]
            const data = XLSX.utils.sheet_to_json(sheet, { raw: false })
            if (data.length > 0) {
              processData(data)
              showToast(`Atualizado automaticamente: ${entry.name}`)
            }
            break
          }
        }
      } catch (e) { console.warn('Erro monitoramento:', e) }
    }, 10000)
    return () => clearInterval(interval)
  }, [watchingFolder, folderHandle])

  const pushHistory = (data) => {
    setHistory(h => [...h.slice(-19), data])
  }

  const processData = useCallback((data) => {
    const newData = data.map(row => {
      const newRow = {}
      Object.entries(row).forEach(([k, v]) => {
        newRow[k.trim()] = typeof v === 'string' ? v.trim() : v
      })
      return newRow
    })

    const allKeys = [...new Set(newData.flatMap(Object.keys))]
    const detectedColumns = allKeys.map(key => {
      const values = newData.map(r => r[key])
      return { key, type: detectColumnType(values) }
    })

    pushHistory(rawData)
    setRawData(newData)
    setColumns(allKeys)
    setColumnTypes(Object.fromEntries(detectedColumns.map(c => [c.key, c.type])))
    setFilters(f => ({ ...f, metric: '', groupBy: '', search: '', valueRange: [null, null], slicer: null }))
    setRankingFilter(null)
    setParticipationFilter(null)
    showToast(`${newData.length} registros carregados`)
  }, [])

  const handleFileUpload = async (files) => {
    const allData = []
    for (const file of files) {
      const buffer = await file.arrayBuffer()
      if (file.name.endsWith('.json')) {
        const text = new TextDecoder().decode(file)
        allData.push(...JSON.parse(text))
      } else {
        const workbook = XLSX.read(file, { type: 'array' })
        workbook.SheetNames.forEach(sheet => {
          allData.push(...XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false }))
        })
      }
    }
    if (allData.length) processData(allData)
    setShowImportModal(false)
  }

  const handlePaste = () => {
    if (!pasteText.trim()) return
    try {
      const lines = pasteText.trim().split('\n')
      const delimiter = pasteText.includes('\t') ? '\t' : pasteText.includes(';') ? ';' : ','
      const headers = lines[0].split(delimiter).map(h => h.trim())
      const data = lines.slice(1).map(line => {
        const values = line.split(delimiter)
        const row = {}
        headers.forEach((h, i) => row[h] = values[i]?.trim() || '')
        return row
      }).filter(r => Object.values(r).some(v => v))
      processData(data)
      setPasteText('')
      setShowImportModal(false)
    } catch (e) { showToast('Erro ao colar dados', 'danger') }
  }

  const handleGSheet = async () => {
    if (!gsheetUrl) return
    try {
      const response = await fetch(gsheetUrl)
      const text = await response.text()
      const lines = text.trim().split('\n')
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
      const data = lines.slice(1).map(line => {
        const values = line.split(',')
        const row = {}
        headers.forEach((h, i) => row[h] = values[i]?.trim().replace(/"/g, '') || '')
        return row
      }).filter(r => Object.values(r).some(v => v))
      processData(data)
      setGsheetUrl('')
      setShowImportModal(false)
    } catch (e) { showToast('Erro ao importar Google Sheets', 'danger') }
  }

  const pickFolder = async () => {
    try {
      const handle = await window.showDirectoryPicker()
      setFolderHandle(handle)
      setWatchingFolder(true)
      showToast('Monitorando pasta...')
    } catch (e) { console.warn(e) }
  }

  const loadDemo = (key) => {
    processData(DEMO_DATASETS[key].data)
    setShowImportModal(false)
  }

  const updateColumnType = (key, type) => {
    setColumnTypes(prev => ({ ...prev, [key]: type }))
  }

  const addRow = () => {
    const newRow = {}
    columns.forEach(c => newRow[c] = '')
    pushHistory(rawData)
    setRawData([...rawData, newRow])
    showToast('Linha adicionada')
  }

  const deleteRow = (index) => {
    const newData = rawData.filter((_, i) => i !== index)
    pushHistory(rawData)
    setRawData(newData)
    showToast('Linha excluída')
  }

  const editRow = (index) => setEditingRow(index)

  const saveEdit = (index, data) => {
    const newData = [...rawData]
    newData[index] = data
    pushHistory(rawData)
    setRawData(newData)
    setEditingRow(null)
    showToast('Alterações salvas')
  }

  const cancelEdit = () => setEditingRow(null)

  const undo = () => {
    if (history.length > 0) {
      const last = history[history.length - 1]
      setRawData(last)
      setHistory(h => h.slice(0, -1))
      showToast('Desfeito')
    }
  }

  const handleCellEdit = (rowIndex, col, value) => {
    const newData = [...rawData]
    newData[rowIndex] = { ...newData[rowIndex], [col]: value }
    pushHistory(rawData)
    setRawData(newData)
    setEditingCell(null)
  }

  const clearMemory = () => {
    localStorage.removeItem('pulsebi3')
    setRawData([])
    setColumns([])
    setColumnTypes({})
    setFilters({ metric: '', groupBy: '', search: '', valueRange: [null, null], slicer: null })
    setTarget(0)
    setChartType('area')
    setRankingFilter(null)
    setParticipationFilter(null)
    setCompanyName('PulseBI 3.0')
    setLogo(null)
    setPalette('navy')
    showToast('Memória limpa')
  }

  const showToast = (msg, variant = 'info') => {
    setToast({ msg, variant })
    setTimeout(() => setToast(null), 4000)
  }

  const exportCSV = () => {
    if (filteredData.length === 0) return
    const ws = XLSX.utils.json_to_sheet(filteredData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Dados')
    XLSX.writeFile(wb, `${companyName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`)
    showToast('CSV exportado')
  }

  const exportTXT = () => {
    const lines = [
      `RELATÓRIO EXECUTIVO - ${companyName}`,
      `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
      `Período: ${rawData.length} registros`,
      '',
      '=== KPIs ===',
      `Total: ${formatBRL(kpis.total)}`,
      `Média: ${formatBRL(kpis.avg)}`,
      `Registros: ${kpis.count}`,
      `Líder: ${kpis.leader} (${formatBRL(kpis.peak)})`,
      `Variação: ${kpis.variation.toFixed(1)}%`,
      '',
      '=== Insights ===',
      ...insights.map(i => i.replace(/<[^>]+>/g, '')),
      '',
      `Meta: ${formatBRL(target)} | Atingido: ${kpis.total > target ? 'SIM' : 'NÃO'} (${target > 0 ? ((kpis.total/target)*100).toFixed(1) : 0}%)`,
      '',
      '=== Ranking Top 10 ===',
      ...Object.entries(
        filteredData.reduce((acc, r) => {
          const k = r[filters.groupBy] || 'N/A'
          acc[k] = (acc[k] || 0) + (parseBrazilianNumber(r[filters.metric]) || 0)
          return acc
        }, {})
      ).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v], i) => `${i+1}. ${k}: ${formatBRL(v)}`),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${companyName.replace(/\s+/g, '_')}_relatorio_${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Relatório TXT baixado')
  }

  const handleDragOver = (e) => e.preventDefault()

  const handleDrop = (e) => {
    e.preventDefault()
    handleFileUpload(Array.from(e.dataTransfer.files))
  }

  const filteredData = useMemo(() => {
    let result = rawData
    if (!filters.metric || !filters.groupBy) return result

    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(search)))
    }

    if (filters.valueRange[0] !== null || filters.valueRange[1] !== null) {
      const [min, max] = filters.valueRange
      const metricValues = rawData.map(r => parseBrazilianNumber(r[filters.metric]) || 0)
      const globalMin = Math.min(...metricValues)
      const globalMax = Math.max(...metricValues)
      const actualMin = min !== null ? min : globalMin
      const actualMax = max !== null ? max : globalMax
      result = result.filter(row => {
        const val = parseBrazilianNumber(row[filters.metric]) || 0
        return val >= actualMin && val <= actualMax
      })
    }

    if (filters.slicer) {
      result = result.filter(row => row[filters.groupBy] === filters.slicer)
    }

    return result
  }, [rawData, filters])

  const kpis = useMemo(() => {
    if (!filters.metric || filteredData.length === 0) return { total: 0, avg: 0, count: 0, leader: '-', peak: 0, sparkline: [], variation: 0 }

    const values = filteredData.map(r => parseBrazilianNumber(r[filters.metric]) || 0)
    const total = values.reduce((a, b) => a + b, 0)
    const avg = total / values.length
    const count = filteredData.length

    const groups = filteredData.reduce((acc, r) => {
      const key = r[filters.groupBy] || 'N/A'
      acc[key] = (acc[key] || 0) + (parseBrazilianNumber(r[filters.metric]) || 0)
      return acc
    }, {})
    const leader = Object.entries(groups).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
    const peak = Math.max(...Object.values(groups))

    const byDate = filteredData.reduce((acc, r) => {
      const date = r.Data || r.data || r.DATA
      if (date) {
        const d = new Date(date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })
        acc[d] = (acc[d] || 0) + (parseBrazilianNumber(r[filters.metric]) || 0)
      }
      return acc
    }, {})
    const sortedDates = Object.keys(byDate).sort((a, b) => new Date(a) - new Date(b))
    const sparkline = sortedDates.map(d => byDate[d])

    const mid = Math.floor(values.length / 2)
    const firstHalf = values.slice(0, mid).reduce((a, b) => a + b, 0)
    const secondHalf = values.slice(mid).reduce((a, b) => a + b, 0)
    const variation = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0

    return { total, avg, count, leader, peak, sparkline, variation }
  }, [filteredData, filters.metric, filters.groupBy])

  const insights = useMemo(() => {
    if (!filters.metric || !filters.groupBy || filteredData.length === 0) return []

    const groups = filteredData.reduce((acc, r) => {
      const key = r[filters.groupBy] || 'N/A'
      acc[key] = (acc[key] || 0) + (parseBrazilianNumber(r[filters.metric]) || 0)
      return acc
    }, {})

    const sorted = Object.entries(groups).sort((a, b) => b[1] - a[1])
    const top1 = sorted[0]
    const top2 = sorted[1]
    const total = sorted.reduce((a, b) => a + b[1], 0)

    const insights = []
    if (top1) insights.push(`🥇 <strong>${top1[0]}</strong> lidera com <strong>${formatBRL(top1[1])}</strong> (${((top1[1]/total)*100).toFixed(1)}% do total)`)
    if (top2) insights.push(`🥈 <strong>${top2[0]}</strong> em segundo com <strong>${formatBRL(top2[1])}</strong> (${((top2[1]/total)*100).toFixed(1)}%)`)
    if (sorted.length > 2) insights.push(`📊 Top 3 representam ${(((sorted[0][1]+sorted[1][1]+(sorted[2]?.[1]||0))/total)*100).toFixed(1)}% do total`)
    insights.push(`📈 Média por registro: <strong>${formatBRL(kpis.avg)}</strong> | Registros: <strong>${kpis.count}</strong>`)

    return insights
  }, [filteredData, filters.metric, filters.groupBy, kpis.avg, kpis.count])

  if (tvMode) {
    return (
      <div className="min-h-screen bg-navy-bg text-navy-text p-8" style={{ fontFamily: 'Inter' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {logo && <img src={logo} alt={companyName} className="h-12 w-auto" />}
              <h1 className="text-4xl font-bold text-gradient">{companyName}</h1>
            </div>
            <div className="text-right">
              <p className="text-navy-textMuted">{new Date().toLocaleString('pt-BR')}</p>
              <p className="text-navy-textMuted text-sm">{filters.metric} por {filters.groupBy}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <Card className="text-center"><p className="text-navy-textMuted text-sm">TOTAL GERAL</p><p className="text-4xl font-bold text-gradient">{formatBRL(kpis.total)}</p></Card>
            <Card className="text-center"><p className="text-navy-textMuted text-sm">MÉDIA POR REGISTRO</p><p className="text-3xl font-bold text-navy-text">{formatBRL(kpis.avg)}</p></Card>
            <Card className="text-center"><p className="text-navy-textMuted text-sm">REGISTROS</p><p className="text-3xl font-bold text-navy-text">{kpis.count}</p></Card>
            <Card className="text-center"><p className="text-navy-textMuted text-sm">LÍDER</p><p className="text-2xl font-bold text-emerald-accent">{kpis.leader}</p></Card>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <EvolutionChart data={filteredData} metric={filters.metric} groupBy={filters.groupBy} palette={palette} chartType={chartType} onTypeChange={setChartType} />
            <GaugeChart data={filteredData} metric={filters.metric} groupBy={filters.groupBy} palette={palette} target={target} onTargetChange={setTarget} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <RankingChart data={filteredData} metric={filters.metric} groupBy={filters.groupBy} palette={palette} onBarClick={setRankingFilter} filteredGroup={rankingFilter} />
            <ParticipationChart data={filteredData} metric={filters.metric} groupBy={filters.groupBy} palette={palette} onSliceClick={setParticipationFilter} filteredGroup={participationFilter} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-bg text-navy-text flex" style={{ fontFamily: 'Inter' }}>
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-navy-card/80 backdrop-blur-sm border-r border-navy-border flex flex-col transition-all duration-300 z-40`}>
        <div className="p-4 border-b border-navy-border flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              {logo && <img src={logo} alt={companyName} className="h-8 w-auto" />}
              <span className="font-bold text-lg text-gradient">{companyName}</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Visão Geral' },
            { id: 'import', icon: Upload, label: 'Importar / Colar' },
            { id: 'brand', icon: Palette, label: 'Marca & Cores' },
            { id: 'tv', icon: Maximize2, label: 'Modo TV' },
          ].map(item => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'primary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="p-3 border-t border-navy-border">
          <Button variant="secondary" className="w-full" onClick={() => setTvMode(true)}>
            <Maximize2 size={20} />
            {sidebarOpen && <span className="ml-2">Modo TV</span>}
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-navy-card/80 backdrop-blur-sm border-b border-navy-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gradient hidden sm:block">{companyName}</h1>
            <div className="flex items-center gap-2 bg-navy-bg rounded-lg px-4 py-1.5">
              <Search size={16} className="text-navy-textMuted" />
              <Input
                placeholder="Buscar em todos os campos..."
                value={filters.search}
                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                className="bg-transparent border-0 focus:ring-0 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <HoverTooltip content="Desfazer (Ctrl+Z)">
              <Button variant="ghost" size="sm" onClick={undo} disabled={history.length === 0}><Undo2 size={20} /></Button>
            </HoverTooltip>
            <HoverTooltip content="Limpar Memória">
              <Button variant="ghost" size="sm" onClick={clearMemory}><RotateCcw size={20} /></Button>
            </HoverTooltip>
            <HoverTooltip content="Atualizar">
              <Button variant="ghost" size="sm" onClick={() => window.location.reload()}><RotateCcw size={20} /></Button>
            </HoverTooltip>
          </div>
        </header>

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${toast.variant === 'danger' ? 'border-red-500/30 bg-red-500/10' : 'border-navy-border bg-navy-card'}`}>
              <span className="text-navy-text">{toast.msg}</span>
              <Button variant="ghost" size="sm" onClick={() => setToast(null)}><X size={16} /></Button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {insights.length > 0 && (
                <div className="bg-navy-accentDim/50 border border-navy-accent/30 rounded-xl p-4 mb-6">
                  <div className="flex flex-wrap gap-4 text-sm text-navy-text">
                    {insights.map((insight, i) => (
                      <span key={i} className="flex items-center gap-2" dangerouslySetInnerHTML={{ __html: insight }} />
                    ))}
                  </div>
                </div>
              )}

              <Card className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <Select
                    label="Métrica Principal"
                    options={columns.filter(c => columnTypes[c] === 'number' || columnTypes[c] === 'currency').map(c => ({ value: c, label: c }))}
                    value={filters.metric}
                    onChange={e => setFilters(f => ({ ...f, metric: e.target.value, groupBy: f.groupBy === e.target.value ? '' : f.groupBy }))}
                  />
                  <Select
                    label="Agrupar Por"
                    options={columns.filter(c => columnTypes[c] === 'text' || columnTypes[c] === 'date').map(c => ({ value: c, label: c }))}
                    value={filters.groupBy}
                    onChange={e => setFilters(f => ({ ...f, groupBy: e.target.value }))}
                  />
                  <Input
                    label="Busca"
                    placeholder="Buscar..."
                    value={filters.search}
                    onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                  />
                  <Input
                    type="number"
                    label="Valor Mín"
                    placeholder="Mín"
                    value={filters.valueRange[0] ?? ''}
                    onChange={e => setFilters(f => ({ ...f, valueRange: [e.target.value ? parseFloat(e.target.value) : null, f.valueRange[1]] }))}
                  />
                  <Input
                    type="number"
                    label="Valor Máx"
                    placeholder="Máx"
                    value={filters.valueRange[1] ?? ''}
                    onChange={e => setFilters(f => ({ ...f, valueRange: [f.valueRange[0], e.target.value ? parseFloat(e.target.value) : null] }))}
                  />
                </div>

                {filters.groupBy && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-navy-textMuted self-center mr-2">Filtros rápidos:</span>
                    {Object.entries(
                      filteredData.reduce((acc, r) => {
                        const k = r[filters.groupBy] || 'N/A'
                        acc[k] = (acc[k] || 0) + 1
                        return acc
                      }, {})
                    ).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([val, count]) => (
                      <HoverTooltip key={val} content={`${count} registros`}>
                        <button
                          className={`slicer-btn ${filters.slicer === val ? 'active' : ''}`}
                          onClick={() => setFilters(f => ({ ...f, slicer: f.slicer === val ? null : val }))}
                        >
                          {val} <span className="ml-1 opacity-60">({count})</span>
                        </button>
                      </HoverTooltip>
                    ))}
                    {filters.slicer && (
                      <Button variant="ghost" size="sm" onClick={() => setFilters(f => ({ ...f, slicer: null }))}>
                        <X size={14} /> Limpar
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => setFilters(f => ({ ...f, search: '', valueRange: [null, null], slicer: null }))}>
                      <Filter size={14} className="mr-1" /> Limpar Tudo
                    </Button>
                  </div>
                )}
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KPICardComponent
                  title="Total Geral"
                  value={formatBRL(kpis.total)}
                  sparkline={kpis.sparkline}
                  variation={kpis.variation}
                  icon={<TrendingUp className="text-navy-accent" />}
                />
                <KPICardComponent
                  title="Média por Registro"
                  value={formatBRL(kpis.avg)}
                  sparkline={kpis.sparkline}
                  icon={<BarChart3 className="text-emerald-accent" />}
                />
                <KPICardComponent
                  title="Registros Ativos"
                  value={kpis.count.toLocaleString('pt-BR')}
                  sparkline={kpis.sparkline}
                  icon={<List className="text-amber-400" />}
                />
                <KPICardComponent
                  title="Líder + Pico Único"
                  value={`${kpis.leader} · ${formatBRL(kpis.peak)}`}
                  icon={<Target className="text-purple-400" />}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <EvolutionChart data={filteredData} metric={filters.metric} groupBy={filters.groupBy} palette={palette} chartType={chartType} onTypeChange={setChartType} />
                <GaugeChart data={filteredData} metric={filters.metric} groupBy={filters.groupBy} palette={palette} target={target} onTargetChange={setTarget} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <RankingChart data={filteredData} metric={filters.metric} groupBy={filters.groupBy} palette={palette} onBarClick={setRankingFilter} filteredGroup={rankingFilter} />
                <ParticipationChart data={filteredData} metric={filters.metric} groupBy={filters.groupBy} palette={palette} onSliceClick={setParticipationFilter} filteredGroup={participationFilter} />
              </div>

              {columns.length > 0 && (
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-navy-text">Planilha Interativa ({filteredData.length} registros)</h3>
                    <Button onClick={addRow}><Plus size={18} /> Novo Lançamento</Button>
                  </div>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          {columns.map(col => (
                            <th key={col}>
                              <div className="flex items-center gap-2">
                                <span>{col}</span>
                                <Badge variant={columnTypes[col] === 'number' ? 'info' : columnTypes[col] === 'currency' ? 'success' : columnTypes[col] === 'date' ? 'warning' : 'info'} className="text-xs">
                                  {columnTypes[col] || 'text'}
                                </Badge>
                              </div>
                            </th>
                          ))}
                          <th className="w-24 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {columns.map(col => (
                              <td key={col}>
                                {editingCell && editingCell.row === rowIndex && editingCell.col === col ? (
                                  <input
                                    type={columnTypes[col] === 'number' || columnTypes[col] === 'currency' ? 'number' : 'text'}
                                    value={row[col] ?? ''}
                                    onChange={e => handleCellEdit(rowIndex, col, e.target.value)}
                                    onBlur={() => setEditingCell(null)}
                                    onKeyDown={e => { if (e.key === 'Enter') setEditingCell(null); if (e.key === 'Escape') { handleCellEdit(rowIndex, col, row[col]); setEditingCell(null); } }}
                                    className="w-full px-2 py-1 bg-navy-bg border border-navy-accent rounded text-sm text-navy-text focus:outline-none"
                                    autoFocus
                                  />
                                ) : (
                                  <span
                                    onDoubleClick={() => setEditingCell({ row: rowIndex, col })}
                                    className="cursor-pointer hover:bg-navy-accentDim/30 px-1 rounded transition-colors"
                                  >
                                    {columnTypes[col] === 'currency' ? formatBRL(parseBrazilianNumber(row[col]) || 0) :
                                     columnTypes[col] === 'number' ? formatNumber(parseBrazilianNumber(row[col]) || 0) :
                                     columnTypes[col] === 'date' && row[col] ? new Date(row[col]).toLocaleDateString('pt-BR') :
                                     row[col] ?? '-'}
                                  </span>
                                )}
                              </td>
                            ))}
                            <td className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <HoverTooltip content="Editar">
                                  <button className="p-1.5 text-navy-textMuted hover:text-navy-accent transition-colors" onClick={() => setEditingRow(rowIndex)}>
                                    <Edit size={16} />
                                  </button>
                                </HoverTooltip>
                                <HoverTooltip content="Excluir">
                                  <button className="p-1.5 text-navy-textMuted hover:text-red-400 transition-colors" onClick={() => deleteRow(rowIndex)}>
                                    <Trash2 size={16} />
                                  </button>
                                </HoverTooltip>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'import' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gradient">Importar / Colar Dados</h2>
                <Button onClick={() => setShowImportModal(true)}><Upload size={20} /> Importar</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(DEMO_DATASETS).map(([key, demo]) => (
                  <Card key={key} className="text-center hover:border-navy-accent/50 cursor-pointer" onClick={() => loadDemo(key)}>
                    <div className="text-4xl mb-2">{['🛍️','🏥','🚚','💰'][Object.keys(DEMO_DATASETS).indexOf(key)]}</div>
                    <h3 className="font-semibold text-navy-text">{demo.name}</h3>
                    <p className="text-sm text-navy-textMuted mt-1">{demo.data.length} registros de exemplo</p>
                  </Card>
                ))}
              </div>

              <Card>
                <h3 className="font-semibold text-navy-text mb-4">Colar Direto (Ctrl+V)</h3>
                <p className="text-sm text-navy-textMuted mb-3">Suporta: Tab, Ponto e vírgula (;), Vírgula (,), JSON array</p>
                <textarea
                  className="w-full h-40 px-4 py-3 bg-navy-bg border border-navy-border rounded-lg text-navy-text placeholder-navy-textMuted focus:outline-none focus:ring-2 focus:ring-navy-accent font-mono text-sm"
                  placeholder="Cole seus dados aqui..."
                  value={pasteText}
                  onChange={e => setPasteText(e.target.value)}
                />
                <div className="flex gap-3 mt-3">
                  <Button onClick={handlePaste}><Clipboard size={18} /> Processar Dados Colados</Button>
                  <Button variant="secondary" onClick={() => setPasteText('')}>Limpar</Button>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-navy-text mb-4">Google Sheets Online</h3>
                <p className="text-sm text-navy-textMuted mb-3">Publique a planilha como CSV (Arquivo → Publicar na web → CSV) e cole a URL</p>
                <Input
                  placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv"
                  value={gsheetUrl}
                  onChange={e => setGsheetUrl(e.target.value)}
                />
                <Button className="mt-3" onClick={handleGSheet}><Globe size={18} /> Importar do Google Sheets</Button>
              </Card>

              <Card>
                <h3 className="font-semibold text-navy-text mb-4">Vigiar Pasta do PC (Automático)</h3>
                <p className="text-sm text-navy-textMuted mb-3">Selecione uma pasta local. O sistema monitora a cada 10s o arquivo mais recente (.xlsx, .csv, .json) e atualiza automaticamente.</p>
                <Button
                  variant={watchingFolder ? 'danger' : 'primary'}
                  onClick={watchingFolder ? () => { setWatchingFolder(false); setFolderHandle(null) } : pickFolder}
                >
                  {watchingFolder ? (
                    <>
                      <RotateCcw size={18} className="animate-spin" /> Parar Monitoramento
                    </>
                  ) : (
                    <>
                      <FolderOpen size={18} /> Escolher Pasta para Vigiar
                    </>
                  )}
                </Button>
                {watchingFolder && <p className="text-sm text-emerald-accent mt-2">🟢 Monitorando ativamente... (atualiza a cada 10s)</p>}
              </Card>
            </div>
          )}

          {activeTab === 'brand' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gradient">Marca & Cores</h2>
                <Button variant="secondary" onClick={() => setShowBrandModal(true)}><Settings size={18} /> Configurar</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="font-semibold text-navy-text mb-4">Nome da Empresa / Painel</h3>
                  <Input
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="PulseBI 3.0"
                  />
                </Card>
                <Card>
                  <h3 className="font-semibold text-navy-text mb-4">Logo (Base64)</h3>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = () => setLogo(reader.result)
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                  {logo && (
                    <div className="mt-3 flex items-center gap-4">
                      <img src={logo} alt="Logo" className="h-16 w-auto rounded-lg border border-navy-border" />
                      <Button variant="danger" size="sm" onClick={() => setLogo(null)}>Remover</Button>
                    </div>
                  )}
                </Card>
              </div>

              <Card>
                <h3 className="font-semibold text-navy-text mb-4">Paletas Executivas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {PALETTES.map(p => (
                    <button
                      key={p.id}
                      className={`relative aspect-square rounded-2xl border-4 transition-all ${palette === p.id ? 'border-navy-accent scale-105' : 'border-navy-border hover:border-navy-accent/50'}`}
                      onClick={() => setPalette(p.id)}
                      style={{ background: `linear-gradient(135deg, var(--${p.id}-bg), var(--${p.id}-card))` }}
                    >
                      {palette === p.id && <div className="absolute top-2 right-2 bg-navy-accent text-navy-bg rounded-full w-6 h-6 flex items-center justify-center"><CheckIcon size={14} /></div>}
                      <div className="absolute bottom-3 left-3 text-white font-medium text-sm">{p.icon} {p.name}</div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-navy-text mb-4">Pré-visualização do Tema</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-navy-card border border-navy-border">
                    <div className="w-full h-24 rounded-lg mb-2" style={{ background: `linear-gradient(135deg, var(--${palette}-bg), var(--${palette}-card))` }}></div>
                    <p className="font-medium text-navy-text">{companyName}</p>
                    <p className="text-sm text-navy-textMuted">{PALETTES.find(p => p.id === palette)?.name}</p>
                  </div>
                  <Button variant="primary" className="h-12"><Zap size={18} /> Aplicar Tema</Button>
                  <Button variant="secondary" className="h-12" onClick={() => setPalette('navy')}>Resetar</Button>
                </div>
              </Card>
            </div>
          )}

          {rawData.length === 0 && activeTab === 'dashboard' && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
              <Upload size={64} className="text-navy-border mb-6" />
              <h2 className="text-2xl font-bold text-navy-text mb-2">Nenhum dado carregado</h2>
              <p className="text-navy-textMuted mb-6 max-w-md">Importe seus dados na aba <strong>Importar / Colar</strong> ou use um modelo de demonstração para começar.</p>
              <Button onClick={() => setActiveTab('import')}>
                <Upload size={20} /> Ir para Importar
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Modais */}
      <Modal isOpen={showImportModal} onClose={() => setShowImportModal(false)} title="Importar Dados" size="lg">
        <div className="space-y-6">
          <div className="drop-zone" onDragOver={handleDragOver} onDrop={handleDrop}>
            <Upload size={48} className="mx-auto text-navy-textMuted mb-4" />
            <p className="text-navy-text mb-2">Arraste arquivos aqui ou clique para selecionar</p>
            <p className="text-sm text-navy-textMuted">Suporta: .xlsx, .xls, .csv, .json (múltiplos arquivos)</p>
            <input type="file" multiple accept=".xlsx,.xls,.csv,.json" className="hidden" id="file-input" onChange={e => handleFileUpload(Array.from(e.target.files))} />
            <Button variant="secondary" className="mt-4" onClick={() => document.getElementById('file-input').click()}>
              <Upload size={18} /> Selecionar Arquivos
            </Button>
          </div>
          <div className="border-t border-navy-border pt-6 space-y-4">
            <Button variant="secondary" className="w-full" onClick={() => { setImportMethod('paste'); setShowImportModal(false); setActiveTab('import') }}>
              <Clipboard size={18} /> Colar Direto (Ctrl+V)
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => { setImportMethod('gsheet'); setShowImportModal(false); setActiveTab('import') }}>
              <Globe size={18} /> Google Sheets
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => { setImportMethod('folder'); setShowImportModal(false); setActiveTab('import') }}>
              <FolderOpen size={18} /> Vigiar Pasta
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)} title="Personalizar Marca & Tema" size="lg">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-navy-textMuted mb-2">Nome da Empresa / Painel</label>
            <Input value={companyName} onChange={e => setCompanyName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-textMuted mb-2">Logo (Base64 ou Upload)</label>
            <Input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => setLogo(reader.result)
                  reader.readAsDataURL(file)
                }
              }}
            />
            {logo && (
              <div className="mt-3 flex items-center gap-4">
                <img src={logo} alt="Logo" className="h-16 w-auto rounded-lg border border-navy-border" />
                <Button variant="danger" size="sm" onClick={() => setLogo(null)}>Remover</Button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-textMuted mb-4">Paleta de Cores</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PALETTES.map(p => (
                <button
                  key={p.id}
                  className={`relative aspect-square rounded-2xl border-4 transition-all ${palette === p.id ? 'border-navy-accent scale-105' : 'border-navy-border hover:border-navy-accent/50'}`}
                  onClick={() => setPalette(p.id)}
                  style={{ background: `linear-gradient(135deg, var(--${p.id}-bg), var(--${p.id}-card))` }}
                >
                  {palette === p.id && <div className="absolute top-2 right-2 bg-navy-accent text-navy-bg rounded-full w-6 h-6 flex items-center justify-center"><CheckIcon size={14} /></div>}
                  <div className="absolute bottom-3 left-3 text-white font-medium text-sm">{p.icon} {p.name}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-navy-border">
            <Button variant="secondary" onClick={() => setShowBrandModal(false)}>Cancelar</Button>
            <Button onClick={() => { setShowBrandModal(false); showToast('Marca atualizada') }}>Salvar</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!Object.keys(newRowData).length || editingRow !== null} onClose={() => { setNewRowData({}); setEditingRow(null) }} title={editingRow !== null ? 'Editar Lançamento' : 'Novo Lançamento'} size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {columns.map(col => (
            <Input
              key={col}
              label={col}
              type={columnTypes[col] === 'number' || columnTypes[col] === 'currency' ? 'number' : columnTypes[col] === 'date' ? 'date' : 'text'}
              value={newRowData[col] ?? (editingRow !== null ? rawData[editingRow][col] : '')}
              onChange={e => setNewRowData(prev => ({ ...prev, [col]: e.target.value }))}
            />
          ))}
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-navy-border">
          <Button variant="secondary" onClick={() => { setNewRowData({}); setEditingRow(null) }}>Cancelar</Button>
          <Button onClick={() => {
            if (editingRow !== null) {
              saveEdit(editingRow, newRowData)
            } else {
              pushHistory(rawData)
              setRawData([...rawData, newRowData])
            }
            setNewRowData({})
            setEditingRow(null)
          }}>
            {editingRow !== null ? 'Salvar Alterações' : 'Adicionar'}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={editingRow !== null} onClose={cancelEdit} title="Editar Lançamento" size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {columns.map(col => (
            <Input
              key={col}
              label={col}
              type={columnTypes[col] === 'number' || columnTypes[col] === 'currency' ? 'number' : columnTypes[col] === 'date' ? 'date' : 'text'}
              value={rawData[editingRow]?.[col] ?? ''}
              onChange={e => {
                const newData = [...rawData]
                newData[editingRow] = { ...newData[editingRow], [col]: e.target.value }
                pushHistory(rawData)
                setRawData(newData)
              }}
            />
          ))}
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-navy-border">
          <Button variant="secondary" onClick={cancelEdit}>Cancelar</Button>
          <Button variant="danger" onClick={() => { deleteRow(editingRow); cancelEdit() }}>Excluir</Button>
        </div>
      </Modal>

    </div>
  )
}