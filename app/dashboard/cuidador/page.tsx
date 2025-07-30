"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Bell, User, MapPin, Clock, Star, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SolicitacaoCliente {
  id: string
  nomeCliente: string
  idade: number
  cidade: string
  condicoesSaude: string
  local: string[]
  horario: string[]
  urgencia: "baixa" | "media" | "alta"
  distancia: string
  foto?: string
  dataSolicitacao: string
}

export default function DashboardCuidador() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoCliente[]>([])
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está logado e é um cuidador
    const userType = localStorage.getItem("userType")
    const email = localStorage.getItem("userEmail")

    if (!userType || userType !== "cuidador") {
      router.push("/login")
      return
    }

    setUserEmail(email || "")

    // Dados simulados de solicitações
    setSolicitacoes([
      {
        id: "1",
        nomeCliente: "Maria Silva",
        idade: 78,
        cidade: "São Paulo, SP",
        condicoesSaude:
          "Alzheimer inicial, hipertensão controlada. Necessita acompanhamento para atividades diárias e administração de medicamentos.",
        local: ["casa"],
        horario: ["manha", "tarde"],
        urgencia: "alta",
        distancia: "2.5 km",
        dataSolicitacao: "2024-01-15",
      },
      {
        id: "2",
        nomeCliente: "João Santos",
        idade: 82,
        cidade: "São Paulo, SP",
        condicoesSaude: "Diabetes tipo 2, mobilidade reduzida. Precisa de auxílio para locomoção e cuidados básicos.",
        local: ["casa"],
        horario: ["tarde", "noite"],
        urgencia: "media",
        distancia: "4.1 km",
        dataSolicitacao: "2024-01-14",
      },
      {
        id: "3",
        nomeCliente: "Ana Costa",
        idade: 75,
        cidade: "São Paulo, SP",
        condicoesSaude: "Recuperação pós-cirúrgica, necessita cuidados especializados e fisioterapia de apoio.",
        local: ["hospital", "casa"],
        horario: ["manha"],
        urgencia: "alta",
        distancia: "1.8 km",
        dataSolicitacao: "2024-01-13",
      },
    ])
  }, [router])

  const handleAceitar = (id: string) => {
    setSolicitacoes((prev) => prev.filter((s) => s.id !== id))
    // Aqui você enviaria a aceitação para o backend
    console.log("Solicitação aceita:", id)
  }

  const handleRecusar = (id: string) => {
    setSolicitacoes((prev) => prev.filter((s) => s.id !== id))
    // Aqui você enviaria a recusa para o backend
    console.log("Solicitação recusada:", id)
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatHorario = (horarios: string[]) => {
    const horarioMap: { [key: string]: string } = {
      manha: "Manhã",
      tarde: "Tarde",
      noite: "Noite",
    }
    return horarios.map((h) => horarioMap[h]).join(", ")
  }

  const formatLocal = (locais: string[]) => {
    const localMap: { [key: string]: string } = {
      casa: "Casa",
      hospital: "Hospital",
    }
    return locais.map((l) => localMap[l]).join(", ")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-lg font-bold text-gray-900">CuidandoComAmor</span>
              </Link>
              <Badge className="bg-green-100 text-green-800">Cuidador</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">{solicitacoes.length} novas solicitações</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">{userEmail}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard do Cuidador</h1>
          <p className="text-gray-600">Gerencie suas solicitações de cuidado e oportunidades de trabalho</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Novas Solicitações</p>
                  <p className="text-2xl font-bold text-gray-900">{solicitacoes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Trabalhos Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avaliação</p>
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Clientes Atendidos</p>
                  <p className="text-2xl font-bold text-gray-900">28</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solicitações */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Solicitações de Cuidado</h2>

          {solicitacoes.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma solicitação no momento</h3>
                <p className="text-gray-600">Novas oportunidades aparecerão aqui quando disponíveis.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {solicitacoes.map((solicitacao) => (
                <Card key={solicitacao.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={solicitacao.foto || "/placeholder.svg"} />
                          <AvatarFallback>
                            {solicitacao.nomeCliente
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{solicitacao.nomeCliente}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span>{solicitacao.idade} anos</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {solicitacao.cidade} • {solicitacao.distancia}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getUrgenciaColor(solicitacao.urgencia)}>Urgência {solicitacao.urgencia}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Condições de Saúde:</h4>
                      <p className="text-gray-600 text-sm">{solicitacao.condicoesSaude}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Local de Atendimento:</h4>
                        <div className="flex gap-2">
                          {solicitacao.local.map((local) => (
                            <Badge key={local} variant="outline">
                              {formatLocal([local])}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Horários Necessários:</h4>
                        <div className="flex gap-2">
                          {solicitacao.horario.map((horario) => (
                            <Badge key={horario} variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatHorario([horario])}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        Solicitado em {new Date(solicitacao.dataSolicitacao).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRecusar(solicitacao.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Recusar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAceitar(solicitacao.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aceitar Solicitação
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
