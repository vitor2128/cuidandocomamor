"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  User,
  MapPin,
  Star,
  Calendar,
  Phone,
  Mail,
  Edit,
  Camera,
  CheckCircle,
  Users,
  Clock,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Contratacao {
  id: string
  nomeCuidador: string
  fotoCuidador?: string
  servico: string
  periodo: string
  status: "ativo" | "concluido" | "cancelado"
  avaliacao?: number
  comentario?: string
  valor: number
}

interface AvaliacaoDada {
  id: string
  nomeCuidador: string
  avaliacao: number
  comentario: string
  data: string
  servico: string
}

interface PerfilCliente {
  id: string
  nome: string
  idade: number
  cidade: string
  telefone: string
  email: string
  foto: string
  sobre: string
  necessidades: string[]
  preferencias: {
    local: string[]
    horarios: string[]
    tipoServico: string[]
  }
  contratacoes: Contratacao[]
  avaliacoesDadas: AvaliacaoDada[]
  membroDesde: string
  totalGasto: number
  cuidadoresContratados: number
}

export default function PerfilCliente() {
  const [perfil, setPerfil] = useState<PerfilCliente | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está logado e é um cliente
    const userType = localStorage.getItem("userType")
    if (!userType || userType !== "cliente") {
      router.push("/login")
      return
    }

    // Dados simulados do perfil do cliente
    setPerfil({
      id: "1",
      nome: "Maria Silva",
      idade: 58,
      cidade: "São Paulo, SP",
      telefone: "(11) 98888-8888",
      email: "maria.silva@email.com",
      foto: "/placeholder.svg?height=200&width=200",
      sobre:
        "Sou filha de uma senhora de 82 anos que precisa de cuidados especiais. Procuro sempre profissionais qualificados e carinhosos para cuidar da minha mãe com o amor e atenção que ela merece.",
      necessidades: ["Alzheimer", "Hipertensão", "Mobilidade Reduzida", "Administração de Medicamentos"],
      preferencias: {
        local: ["casa"],
        horarios: ["manha", "tarde"],
        tipoServico: ["cuidados-basicos", "acompanhamento-medico", "fisioterapia"],
      },
      membroDesde: "2022-03-15",
      totalGasto: 12500,
      cuidadoresContratados: 5,
      contratacoes: [
        {
          id: "1",
          nomeCuidador: "Júlia Castro",
          fotoCuidador: "/placeholder.svg?height=60&width=60",
          servico: "Cuidados domiciliares",
          periodo: "Jan 2024 - Presente",
          status: "ativo",
          avaliacao: 5,
          comentario: "Excelente profissional, muito cuidadosa e carinhosa.",
          valor: 3200,
        },
        {
          id: "2",
          nomeCuidador: "Carlos Silva",
          fotoCuidador: "/placeholder.svg?height=60&width=60",
          servico: "Acompanhamento médico",
          periodo: "Set 2023 - Dez 2023",
          status: "concluido",
          avaliacao: 4,
          comentario: "Bom profissional, pontual e responsável.",
          valor: 2800,
        },
        {
          id: "3",
          nomeCuidador: "Ana Rodrigues",
          fotoCuidador: "/placeholder.svg?height=60&width=60",
          servico: "Cuidados pós-cirúrgicos",
          periodo: "Jun 2023 - Ago 2023",
          status: "concluido",
          avaliacao: 5,
          comentario: "Profissional excepcional, ajudou muito na recuperação.",
          valor: 4200,
        },
      ],
      avaliacoesDadas: [
        {
          id: "1",
          nomeCuidador: "Júlia Castro",
          avaliacao: 5,
          comentario:
            "Júlia é excepcional! Cuida da minha mãe com tanto carinho e profissionalismo. Sempre pontual, atenciosa e muito competente.",
          data: "2024-01-10",
          servico: "Cuidados domiciliares",
        },
        {
          id: "2",
          nomeCuidador: "Carlos Silva",
          avaliacao: 4,
          comentario: "Bom profissional, pontual e responsável. Minha mãe se sentiu segura com ele.",
          data: "2023-12-20",
          servico: "Acompanhamento médico",
        },
        {
          id: "3",
          nomeCuidador: "Ana Rodrigues",
          avaliacao: 5,
          comentario: "Profissional excepcional, ajudou muito na recuperação da minha mãe após a cirurgia.",
          data: "2023-08-15",
          servico: "Cuidados pós-cirúrgicos",
        },
      ],
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  if (!perfil) {
    return <div>Carregando...</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "concluido":
        return "bg-blue-100 text-blue-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo"
      case "concluido":
        return "Concluído"
      case "cancelado":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/cliente" className="flex items-center">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-lg font-bold text-gray-900">CuidandoComAmor</span>
              </Link>
              <Badge className="bg-purple-100 text-purple-800">Meu Perfil</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/cliente">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Header do Perfil */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={perfil.foto || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {perfil.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full p-2">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center mt-4">
                <Badge className="bg-purple-100 text-purple-800 mb-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Cliente Verificado
                </Badge>
                <div className="text-sm text-gray-500">
                  Membro desde {new Date(perfil.membroDesde).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{perfil.nome}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {perfil.idade} anos
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {perfil.cidade}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {perfil.cuidadoresContratados} cuidadores contratados
                    </span>
                  </div>
                </div>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>

              <p className="text-gray-600 mb-6">{perfil.sobre}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{perfil.contratacoes.length}</div>
                  <div className="text-sm text-gray-600">Contratações</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">R$ {perfil.totalGasto.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Investido</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{perfil.avaliacoesDadas.length}</div>
                  <div className="text-sm text-gray-600">Avaliações Dadas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs do Perfil */}
        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
            <TabsTrigger value="contato">Contato</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Necessidades de Cuidado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {perfil.necessidades.map((necessidade) => (
                      <Badge key={necessidade} variant="outline">
                        {necessidade}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Preferências
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Local Preferido:</h4>
                    <div className="flex gap-2">
                      {perfil.preferencias.local.map((local) => (
                        <Badge key={local} variant="outline">
                          {local === "casa" ? "Casa" : "Hospital"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Horários:</h4>
                    <div className="flex gap-2">
                      {perfil.preferencias.horarios.map((horario) => (
                        <Badge key={horario} variant="outline">
                          {horario === "manha" ? "Manhã" : horario === "tarde" ? "Tarde" : "Noite"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sobre Mim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{perfil.sobre}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Histórico de Contratações
                </CardTitle>
                <CardDescription>{perfil.contratacoes.length} contratações realizadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {perfil.contratacoes.map((contratacao) => (
                  <div key={contratacao.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contratacao.fotoCuidador || "/placeholder.svg"} />
                        <AvatarFallback>
                          {contratacao.nomeCuidador
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{contratacao.nomeCuidador}</h3>
                            <p className="text-gray-600">{contratacao.servico}</p>
                            <p className="text-sm text-gray-500">{contratacao.periodo}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(contratacao.status)}>
                              {getStatusText(contratacao.status)}
                            </Badge>
                            <p className="text-lg font-semibold text-green-600 mt-1">
                              R$ {contratacao.valor.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {contratacao.avaliacao && (
                          <div className="mt-3 p-3 bg-gray-50 rounded">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < contratacao.avaliacao! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium">Minha Avaliação</span>
                            </div>
                            <p className="text-sm text-gray-600">{contratacao.comentario}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="avaliacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Minhas Avaliações
                </CardTitle>
                <CardDescription>{perfil.avaliacoesDadas.length} avaliações realizadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {perfil.avaliacoesDadas.map((avaliacao) => (
                  <div key={avaliacao.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{avaliacao.nomeCuidador}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < avaliacao.avaliacao ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(avaliacao.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">{avaliacao.servico}</Badge>
                    </div>
                    <p className="text-gray-600">{avaliacao.comentario}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contato" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Telefone</h4>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {perfil.telefone}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">E-mail</h4>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {perfil.email}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Localização</h4>
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {perfil.cidade}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Membro desde</h4>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(perfil.membroDesde).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
