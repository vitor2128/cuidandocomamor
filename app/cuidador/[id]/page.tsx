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
  Award,
  Clock,
  Phone,
  CheckCircle,
  Briefcase,
  GraduationCap,
  ArrowLeft,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

// Reutilizando as interfaces do perfil do cuidador
interface Certificacao {
  id: string
  nome: string
  instituicao: string
  dataObtencao: string
  validade?: string
  verificado: boolean
}

interface ExperienciaProfissional {
  id: string
  cargo: string
  local: string
  periodo: string
  descricao: string
  tipo: "casa" | "hospital" | "clinica"
}

interface Avaliacao {
  id: string
  nomeCliente: string
  avaliacao: number
  comentario: string
  data: string
  servico: string
}

interface CuidadorPublico {
  id: string
  nome: string
  idade: number
  cidade: string
  foto: string
  sobre: string
  especialidades: string[]
  disponibilidade: string[]
  turnos: string[]
  precoHora: number
  avaliacaoMedia: number
  totalAvaliacoes: number
  clientesAtendidos: number
  anosExperiencia: number
  certificacoes: Certificacao[]
  experiencias: ExperienciaProfissional[]
  avaliacoes: Avaliacao[]
  verificado: boolean
  ativo: boolean
  distancia: string
}

export default function PerfilCuidadorPublico() {
  const [cuidador, setCuidador] = useState<CuidadorPublico | null>(null)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Verificar se o usuário está logado
    const userType = localStorage.getItem("userType")
    if (!userType) {
      router.push("/login")
      return
    }

    // Dados simulados do cuidador público (baseado no ID da URL)
    setCuidador({
      id: params.id as string,
      nome: "Júlia Castro",
      idade: 32,
      cidade: "São Paulo, SP",
      foto: "/placeholder.svg?height=200&width=200",
      sobre:
        "Sou enfermeira formada com mais de 8 anos de experiência em cuidados geriátricos. Tenho paixão por cuidar de idosos e proporcionar qualidade de vida e dignidade aos meus pacientes. Especializada em cuidados com Alzheimer, diabetes e reabilitação pós-cirúrgica.",
      especialidades: ["Alzheimer", "Diabetes", "Hipertensão", "Fisioterapia", "Medicamentos", "Pós-cirúrgico"],
      disponibilidade: ["casa", "hospital"],
      turnos: ["manha", "tarde"],
      precoHora: 45,
      avaliacaoMedia: 4.9,
      totalAvaliacoes: 47,
      clientesAtendidos: 28,
      anosExperiencia: 8,
      verificado: true,
      ativo: true,
      distancia: "2.1 km de você",
      certificacoes: [
        {
          id: "1",
          nome: "Técnico em Enfermagem",
          instituicao: "SENAC São Paulo",
          dataObtencao: "2016-12-15",
          verificado: true,
        },
        {
          id: "2",
          nome: "Especialização em Geriatria",
          instituicao: "Hospital das Clínicas - USP",
          dataObtencao: "2018-06-20",
          verificado: true,
        },
        {
          id: "3",
          nome: "Curso de Cuidados com Alzheimer",
          instituicao: "Instituto de Neurologia",
          dataObtencao: "2020-03-10",
          verificado: true,
        },
      ],
      experiencias: [
        {
          id: "1",
          cargo: "Cuidadora Particular",
          local: "Residência - Família Silva",
          periodo: "2020 - Presente",
          descricao:
            "Cuidados integrais com idoso portador de Alzheimer. Administração de medicamentos, fisioterapia de apoio, acompanhamento médico e atividades de vida diária.",
          tipo: "casa",
        },
        {
          id: "2",
          cargo: "Auxiliar de Enfermagem",
          local: "Hospital São Camilo",
          periodo: "2018 - 2020",
          descricao:
            "Atuação na ala geriátrica, cuidados com pacientes idosos internados, administração de medicamentos e apoio às famílias.",
          tipo: "hospital",
        },
      ],
      avaliacoes: [
        {
          id: "1",
          nomeCliente: "Maria Santos",
          avaliacao: 5,
          comentario:
            "Júlia é excepcional! Cuida da minha mãe com tanto carinho e profissionalismo. Sempre pontual, atenciosa e muito competente. Recomendo de olhos fechados!",
          data: "2024-01-10",
          servico: "Cuidados domiciliares",
        },
        {
          id: "2",
          nomeCliente: "Carlos Oliveira",
          avaliacao: 5,
          comentario:
            "Profissional exemplar. Meu pai se sente muito seguro com ela. Tem conhecimento técnico excelente e é muito humana no tratamento.",
          data: "2023-12-15",
          servico: "Acompanhamento médico",
        },
        {
          id: "3",
          nomeCliente: "Ana Costa",
          avaliacao: 4,
          comentario:
            "Muito boa profissional, dedicada e cuidadosa. Ajudou muito na recuperação da minha sogra após a cirurgia.",
          data: "2023-11-20",
          servico: "Cuidados pós-cirúrgicos",
        },
      ],
    })
  }, [params.id, router])

  const handleSolicitarContato = () => {
    // Aqui você enviaria a solicitação de contato para o backend
    alert("Solicitação de contato enviada! A cuidadora receberá sua mensagem.")
  }

  if (!cuidador) {
    return <div>Carregando...</div>
  }

  const formatTurno = (turnos: string[]) => {
    const turnoMap: { [key: string]: string } = {
      manha: "Manhã",
      tarde: "Tarde",
      noite: "Noite",
    }
    return turnos.map((t) => turnoMap[t]).join(", ")
  }

  const formatDisponibilidade = (disponibilidade: string[]) => {
    const dispMap: { [key: string]: string } = {
      casa: "Casa",
      hospital: "Hospital",
    }
    return disponibilidade.map((d) => dispMap[d]).join(", ")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <Link href="/" className="flex items-center">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-lg font-bold text-gray-900">CuidandoComAmor</span>
              </Link>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Perfil Público</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Header do Perfil */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={cuidador.foto || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {cuidador.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center mt-4">
                {cuidador.verificado && (
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                )}
                <div className="flex items-center gap-1 justify-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{cuidador.avaliacaoMedia}</span>
                  <span className="text-gray-500">({cuidador.totalAvaliacoes} avaliações)</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{cuidador.distancia}</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{cuidador.nome}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {cuidador.idade} anos
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {cuidador.cidade}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {cuidador.anosExperiencia} anos de experiência
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">R$ {cuidador.precoHora}</div>
                  <div className="text-sm text-gray-600">por hora</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{cuidador.sobre}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{cuidador.clientesAtendidos}</div>
                  <div className="text-sm text-gray-600">Clientes Atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{cuidador.certificacoes.length}</div>
                  <div className="text-sm text-gray-600">Certificações</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {cuidador.ativo ? "Disponível" : "Indisponível"}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSolicitarContato} className="bg-purple-600 hover:bg-purple-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Solicitar Contato
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Ver Contato
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs do Perfil */}
        <Tabs defaultValue="sobre" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sobre">Sobre</TabsTrigger>
            <TabsTrigger value="experiencia">Experiência</TabsTrigger>
            <TabsTrigger value="certificacoes">Certificações</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="sobre" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Especialidades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cuidador.especialidades.map((esp) => (
                      <Badge key={esp} variant="outline">
                        {esp}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Disponibilidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Local:</h4>
                    <p className="text-gray-600">{formatDisponibilidade(cuidador.disponibilidade)}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Turnos:</h4>
                    <p className="text-gray-600">{formatTurno(cuidador.turnos)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{cuidador.sobre}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiencia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experiência Profissional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cuidador.experiencias.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {index !== cuidador.experiencias.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200" />
                    )}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{exp.cargo}</h3>
                        <p className="text-blue-600 font-medium">{exp.local}</p>
                        <p className="text-sm text-gray-500 mb-2">{exp.periodo}</p>
                        <p className="text-gray-600">{exp.descricao}</p>
                        <Badge variant="outline" className="mt-2">
                          {exp.tipo === "casa" ? "Domiciliar" : exp.tipo === "hospital" ? "Hospitalar" : "Clínica"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Certificações e Cursos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {cuidador.certificacoes.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{cert.nome}</h3>
                            <p className="text-blue-600">{cert.instituicao}</p>
                            <p className="text-sm text-gray-500">
                              Obtido em {new Date(cert.dataObtencao).toLocaleDateString("pt-BR")}
                              {cert.validade && (
                                <span> • Válido até {new Date(cert.validade).toLocaleDateString("pt-BR")}</span>
                              )}
                            </p>
                          </div>
                          {cert.verificado && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verificado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="avaliacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Avaliações dos Clientes
                </CardTitle>
                <CardDescription>
                  {cuidador.totalAvaliacoes} avaliações • Média {cuidador.avaliacaoMedia}/5.0
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cuidador.avaliacoes.map((avaliacao) => (
                  <div key={avaliacao.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{avaliacao.nomeCliente}</h4>
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
        </Tabs>
      </main>
    </div>
  )
}
