import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'

import {
  Search,
  Bell,
  User,
  Plus,
  X,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Filter,
  Settings,
  Eye,
  Edit,
  Calendar as CalendarIcon,
  Tag,
  Activity,
  Users,
  BookOpen,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  rememberMe: z.boolean().optional(),
})

const registerSchema = z.object({
  fullName: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'E-mail acadêmico inválido' }),
  lattesUrl: z.string().url({ message: 'URL do Lattes inválida' }).or(z.literal('')),
  userType: z.enum(['PESQUISADOR', 'PROFESSOR', 'INTERESSADO']),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'Você deve aceitar os termos de uso' }),
})

const projectSchema = z.object({
  title: z.string().min(3, { message: 'Título é obrigatório' }),
  area: z.string().min(1, { message: 'Área é obrigatória' }),
  description: z.string().min(10, { message: 'Descrição detalhada é obrigatória' }),
})

export const ComponentShowcase: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['Robótica', 'IA', 'Visão Computacional'])
  const [newTagInput, setNewTagInput] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isAvailable, setIsAvailable] = useState(true)
  const [sliderValue, setSliderValue] = useState([70])

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'pesquisador@navir.ufam.edu.br',
      password: '••••••••',
      rememberMe: true,
    },
  })

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      lattesUrl: '',
      userType: 'PESQUISADOR',
      acceptTerms: false,
    },
  })

  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: '', area: 'ia', description: '' },
  })

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()])
      setNewTagInput('')
      toast.success(`Tag "${newTagInput.trim()}" adicionada!`)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
    toast.info(`Tag "${tagToRemove}" removida.`)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground space-y-8 pb-16">
        {/* Header Superior estilo NAVIR */}
        <header className="bg-navy border-b border-sidebar-border px-6 py-4 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center space-x-3">
            <img className="h-16" src="/logo.svg" alt="Logotipo do NAVIR" />
            <div>
              <h1 className="font-heading font-bold text-lg leading-none tracking-wide text-white">
                NAVIR
              </h1>
              <p className="text-xs text-blue-light">
                Núcleo de Automação, Visão Computacional, IA e Robótica
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover:bg-navy-light"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-pulse" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <h4 className="font-heading text-sm font-semibold mb-2 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-secondary" /> Notificações do Sistema
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded bg-muted">
                    <p className="font-medium">Novo usuário cadastrado</p>
                    <p className="text-muted-foreground text-[10px]">
                      Aguardando aprovação do perfil Pesquisador.
                    </p>
                  </div>
                  <div className="p-2 rounded bg-muted">
                    <p className="font-medium">Reserva de dispositivo aprovada</p>
                    <p className="text-muted-foreground text-[10px]">
                      Projeto MOB4AI • Dispositivo ESP32-CAM.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-white hover:bg-navy-light"
                >
                  <Avatar className="w-8 h-8 border border-secondary">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-secondary text-white font-bold">
                      NV
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline-block">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info('Navegando para Perfil')}>
                  <User className="mr-2 h-4 w-4" /> Perfil Acadêmico
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info('Abrindo Configurações')}>
                  <Settings className="mr-2 h-4 w-4" /> Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => toast.error('Sessão encerrada')}
                >
                  <User className="mr-2 h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {/* Banner de apresentação da suíte */}
          <div className="bg-navy-gradient text-white p-6 rounded-xl shadow-lg border border-navy-light flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-cyan text-white font-semibold">DESIGN SYSTEM NAVIR</Badge>
                <Badge variant="outline" className="text-white border-cyan-light">
                  39 COMPONENTES UI
                </Badge>
              </div>
              <h2 className="text-2xl font-heading font-bold">
                Catálogo Completo de Componentes & Paleta NAVIR
              </h2>
              <p className="text-sm text-slate-200 mt-1 max-w-2xl">
                Demonstração técnica interativa contendo formulários de <strong>Login</strong>,{' '}
                <strong>Cadastro</strong>, <strong>Projetos</strong>,{' '}
                <strong>Gerenciamento de Tags</strong>, <strong>Tabelas de Gestão</strong>,{' '}
                <strong>Modais de Confirmação/Justificativa</strong> e toda a suíte visual de
                tokens.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                className="bg-blue hover:bg-blue-light text-white font-medium shadow"
                onClick={() => toast.success('Todas as cores NAVIR validadas!')}
              >
                Validar Cores
              </Button>
            </div>
          </div>

          {/* Seção 1: Formulários Principais do Sistema (Login & Cadastro) */}
          <section className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" /> 1. Formulários de Autenticação &
              Cadastro
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form de Login */}
              <Card className="shadow-md border-border">
                <CardHeader className="bg-muted/30 border-b border-border">
                  <CardTitle className="font-heading text-lg text-primary flex items-center justify-between">
                    <span>Tela de Login</span>
                    <Badge variant="secondary">Exemplo de Formulário</Badge>
                  </CardTitle>
                  <CardDescription>
                    Acesso seguro à área interna do laboratório NAVIR.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(() =>
                        toast.success('Login efetuado com sucesso!')
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail Acadêmico ou CPF</FormLabel>
                            <FormControl>
                              <Input placeholder="seu.email@ufam.edu.br" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between text-xs">
                        <FormField
                          control={loginForm.control}
                          name="rememberMe"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="text-xs cursor-pointer">
                                Lembrar minha sessão
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        <a
                          href="#esqueceu"
                          onClick={(e) => {
                            e.preventDefault()
                            toast.info('Link de recuperação enviado.')
                          }}
                          className="text-secondary font-medium hover:underline"
                        >
                          Esqueceu a senha?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-navy-light text-white font-medium"
                      >
                        Entrar no NAVIR
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Form de Cadastro */}
              <Card className="shadow-md border-border">
                <CardHeader className="bg-muted/30 border-b border-border">
                  <CardTitle className="font-heading text-lg text-primary flex items-center justify-between">
                    <span>Solicitação de Cadastro</span>
                    <Badge variant="outline">Fluxo com Escolha de Perfil</Badge>
                  </CardTitle>
                  <CardDescription>
                    Cadastro de Pesquisadores, Professores e Interessados.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit((values) =>
                        toast.success(`Solicitação enviada para ${values.userType}!`)
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        control={registerForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Maria da Silva" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail institucional</FormLabel>
                              <FormControl>
                                <Input placeholder="maria@ufam.edu.br" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="lattesUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link do Lattes (opcional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://lattes.cnpq.br/..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={registerForm.control}
                        name="userType"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Tipo de Perfil Desejado</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 gap-2"
                              >
                                <div>
                                  <RadioGroupItem
                                    value="PESQUISADOR"
                                    id="p-pesquisador"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="p-pesquisador"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary cursor-pointer text-center text-xs"
                                  >
                                    <Users className="mb-1 h-4 w-4" />
                                    Pesquisador
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem
                                    value="PROFESSOR"
                                    id="p-professor"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="p-professor"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary cursor-pointer text-center text-xs"
                                  >
                                    <BookOpen className="mb-1 h-4 w-4" />
                                    Professor
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem
                                    value="INTERESSADO"
                                    id="p-interessado"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="p-interessado"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary cursor-pointer text-center text-xs"
                                  >
                                    <User className="mb-1 h-4 w-4" />
                                    Interessado
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="acceptTerms"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="text-xs cursor-pointer">
                              Aceito as normas e regulamentos do Laboratório NAVIR
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-secondary hover:bg-blue-light text-white font-medium"
                      >
                        Enviar Solicitação de Cadastro
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Seção 2: Gestão de Projetos e Inclusão Dinâmica de Tags */}
          <section className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
              <Tag className="w-5 h-5 text-accent" /> 2. Projetos & Gerenciamento Dinâmico de Tags
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Form de Cadastro de Projeto com Tags */}
              <Card className="md:col-span-1 shadow-md">
                <CardHeader className="bg-muted/30 border-b border-border">
                  <CardTitle className="font-heading text-base">Novo Projeto & Tags</CardTitle>
                  <CardDescription>Cadastrar área de inovação e tecnologia.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <Form {...projectForm}>
                    <form
                      onSubmit={projectForm.handleSubmit((val) =>
                        toast.success(`Projeto "${val.title}" criado!`)
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        control={projectForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título do Projeto</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: MOB4AI" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={projectForm.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Área Tecnológica</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a área" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ia">Inteligência Artificial</SelectItem>
                                <SelectItem value="robotica">Robótica</SelectItem>
                                <SelectItem value="visao">Visão Computacional</SelectItem>
                                <SelectItem value="iot">IoT & Automação</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Inclusão Interativa de Tags */}
                      <div className="space-y-2">
                        <Label>Adicionar Tags / Palavras-chave</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Nova tag..."
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddTag()
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            onClick={handleAddTag}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {tags.map((t) => (
                            <Badge
                              key={t}
                              className="bg-navy-light text-white flex items-center gap-1 pr-1 text-xs"
                            >
                              {t}
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(t)}
                                className="hover:bg-navy rounded-full p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-navy-light text-white"
                      >
                        Cadastrar Projeto
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Cards de Exemplo de Projetos */}
              <div className="md:col-span-2 space-y-4">
                {/* Projeto MOB4AI */}
                <Card className="metric-card border-l-4 border-l-secondary shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-heading text-lg text-primary">
                          MOB4AI — Mobilidade Inteligente
                        </CardTitle>
                        <CardDescription>
                          Pesquisa aplicada a veículos autônomos e sistemas inteligentes.
                        </CardDescription>
                      </div>
                      <Badge className="bg-success text-success-foreground font-semibold">
                        ATIVO
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-secondary text-secondary">
                        Inteligência Artificial
                      </Badge>
                      <Badge variant="outline" className="border-accent text-accent">
                        Visão Computacional
                      </Badge>
                      <Badge variant="secondary">C++ / Python</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Progresso de Execução</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-primary text-white text-[10px]">
                            DR
                          </AvatarFallback>
                        </Avatar>
                        <span>Coord: Dr. Ricardo</span>
                      </div>
                      <span>5 Pesquisadores Vinculados</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Projeto Startando NAVIR */}
                <Card className="metric-card border-l-4 border-l-accent shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-heading text-lg text-primary">
                          Startando com o NAVIR
                        </CardTitle>
                        <CardDescription>
                          Capacitação e onboarding de novos talentos e alunos de graduação.
                        </CardDescription>
                      </div>
                      <Badge className="bg-warning text-warning-foreground font-semibold">
                        EM ANDAMENTO
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-accent text-accent">
                        Treinamento
                      </Badge>
                      <Badge variant="outline" className="border-navy text-navy">
                        Robótica
                      </Badge>
                      <Badge variant="secondary">ROS2 / Arduino</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Progresso de Módulos</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-accent text-white text-[10px]">
                            PF
                          </AvatarFallback>
                        </Avatar>
                        <span>Coord: Prof. Fabiano</span>
                      </div>
                      <span>12 Alunos Treinados</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Seção 3: Tabela de Gestão de Usuários e Filtros Avançados */}
          <section className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" /> 3. Tabela de Gestão com Filtros &
              Ações por Linha
            </h3>

            <Card className="shadow-md">
              <CardHeader className="bg-muted/30 border-b border-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-heading text-lg">Usuários do Laboratório</CardTitle>
                    <CardDescription>Filtros por Perfil, Status e Disponibilidade.</CardDescription>
                  </div>

                  {/* Barra de Filtros */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      <Input placeholder="Buscar usuário..." className="pl-9 w-48 h-9 text-xs" />
                    </div>

                    <Select defaultValue="todos">
                      <SelectTrigger className="w-36 h-9 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos Status</SelectItem>
                        <SelectItem value="aceito">ACEITO</SelectItem>
                        <SelectItem value="pendente">PENDENTE</SelectItem>
                        <SelectItem value="negado">NEGADO</SelectItem>
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 text-xs">
                          <CalendarIcon className="w-3.5 h-3.5 mr-1" /> Data
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                        />
                      </PopoverContent>
                    </Popover>

                    <div className="flex items-center space-x-2 pl-2 border-l">
                      <Switch
                        id="filter-avail"
                        checked={isAvailable}
                        onCheckedChange={setIsAvailable}
                      />
                      <Label htmlFor="filter-avail" className="text-xs cursor-pointer">
                        Disponíveis
                      </Label>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Tipo de Perfil</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Status Acadêmico</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Linha 1: Aceito */}
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-navy text-white text-xs">
                              AM
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">Ana Maria Costa</p>
                            <p className="text-xs text-muted-foreground">ana.costa@ufam.edu.br</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-info text-info-foreground">PESQUISADOR</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-success text-success-foreground">ACEITO</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-success text-success">
                          REGULAR
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast('Visualizando perfil')}>
                              <Eye className="w-4 h-4 mr-2" /> Detalhes (T12)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast('Editar cadastro')}>
                              <Edit className="w-4 h-4 mr-2" /> Editar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    {/* Linha 2: Pendente */}
                    <TableRow className="bg-warning-muted/20">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-warning text-warning-foreground font-bold text-xs">
                              CL
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">Carlos Lima</p>
                            <p className="text-xs text-muted-foreground">
                              carlos.lima@icomp.ufam.edu.br
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-info-muted text-info">PROFESSOR</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-warning text-warning-foreground">PENDENTE</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-warning text-warning">
                          EM ANÁLISE
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end space-x-1">
                        {/* Aprovar Modal (Dialog) */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-success hover:bg-success-muted"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="font-heading text-success flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" /> Aprovar Cadastro de Carlos Lima
                              </DialogTitle>
                              <DialogDescription>
                                O usuário receberá privilégios do perfil <strong>PROFESSOR</strong>{' '}
                                no laboratório.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button variant="outline">Cancelar</Button>
                              <Button
                                className="bg-success text-white hover:bg-success/90"
                                onClick={() => toast.success('Cadastro aprovado com sucesso!')}
                              >
                                Confirmar Aprovação
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Negar Modal (AlertDialog com Justificativa Textarea) */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive-muted"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-heading text-destructive flex items-center gap-2">
                                <XCircle className="w-5 h-5" /> Negar Solicitação de Cadastro
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Informe a justificativa obrigatória. O motivo será enviado ao e-mail
                                do usuário.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="space-y-2 my-2">
                              <Label>Motivo da Negação (Obrigatório)</Label>
                              <Textarea placeholder="Ex: Vínculo acadêmico não comprovado no Lattes..." />
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Voltar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => toast.error('Solicitação negada com justificativa.')}
                              >
                                Negar Cadastro
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>

                    {/* Linha 3: Negado */}
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                              JR
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">João Ribeiro</p>
                            <p className="text-xs text-muted-foreground">joao.ribeiro@gmail.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">INTERESSADO</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-destructive text-destructive-foreground">NEGADO</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-destructive text-destructive">
                          INATIVO
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Clock className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Recusado em 14/06/2026</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          {/* Seção 4: Demais Componentes Adicionais do Design */}
          <section className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
              <Filter className="w-5 h-5 text-accent" /> 4. Suíte Adicional: Accordion, Command
              Search, Slider & Skeleton
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Command Combobox & Accordion */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="font-heading text-base">
                    Busca Rápida (Command) & FAQ (Accordion)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-2 bg-muted/20">
                    <Label className="text-xs font-semibold mb-1 block">
                      Combobox de Pesquisa Rápida (Command)
                    </Label>
                    <Command className="rounded-lg border shadow-sm">
                      <CommandInput placeholder="Buscar projetos ou dispositivos..." />
                      <CommandList className="max-h-32">
                        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                        <CommandGroup heading="Projetos">
                          <CommandItem onSelect={() => toast('MOB4AI selecionado')}>
                            MOB4AI
                          </CommandItem>
                          <CommandItem onSelect={() => toast('Startando NAVIR selecionado')}>
                            Startando com o NAVIR
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="acc-1">
                      <AccordionTrigger className="text-sm">
                        Quais são as regras para perfil INTERESSADO?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground">
                        Usuários com perfil INTERESSADO visualizam a tela de oportunidade com
                        orientações sobre como se tornar pesquisador ou aluno bolsista.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="acc-2">
                      <AccordionTrigger className="text-sm">
                        Como funciona o export de relatórios em PDF/CSV?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground">
                        Administradores e professores podem exportar listas consolidadas via serviço
                        REST em `/api/v1/relatorios/export`.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Slider, ScrollArea & Skeleton Loading */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="font-heading text-base">
                    Sliders, Rolamento Estilizado & Skeleton Loading
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Filtro de Limite de Carga de Rede (Slider)</span>
                      <span className="text-secondary font-bold">{sliderValue[0]}%</span>
                    </div>
                    <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={5} />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">
                      Feed de Atividades do Laboratório (ScrollArea)
                    </Label>
                    <ScrollArea className="h-28 w-full rounded-md border p-3 bg-muted/20">
                      <div className="space-y-2 text-xs">
                        <p className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-success" />{' '}
                          <strong>[11:00]</strong> Projeto MOB4AI atualizado para 85%.
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-warning" /> <strong>[10:15]</strong>{' '}
                          Cadastro de Carlos Lima aguarda aprovação.
                        </p>
                        <p className="flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5 text-destructive" />{' '}
                          <strong>[09:30]</strong> Tentativa de login recusada para perfil inativo.
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-info" /> <strong>[08:00]</strong>{' '}
                          Backup automático da base concluído.
                        </p>
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <Label className="text-xs font-semibold">
                      Skeleton Screen (Loading State Preview)
                    </Label>
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-4/5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  )
}
