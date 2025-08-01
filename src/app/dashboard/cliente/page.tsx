"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, User, MapPin, Star, Mail, Clock, X, SlidersHorizontal, MapIcon, DollarSign } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Cuidador {
  id: string
  nome: string
  idade: number
  cidade: string
  experiencia: string
  especialidades: string[]
  disponibilidade: string[]
  turno: string[]
  avaliacao: number
  numeroAvaliacoes: number
  precoHora: number
  distancia: number // em km
  foto?: string
  verificado: boolean
}

interface FiltrosAtivos {
  especialidades: string[]
  precoMin: number
  precoMax: number
  distanciaMax: number
  avaliacaoMin: number
  disponibilidade: string[]
  turnos: string[]
  ordenacao: "relevancia" | "preco-menor" | "preco-maior" | "avaliacao" | "distancia"
}

const ESPECIALIDADES_DISPONIVEIS = [
  "Alzheimer",
  "Diabetes",
  "Hipertensão",
  "Fisioterapia",
  "Mobilidade Reduzida",
  "Medicamentos",
  "Pós-cirúrgico",
  "Curativos",
  "Administração de Medicamentos",
  "Acompanhamento Médico",
  "Cuidados Básicos",
]

export default function DashboardCliente() {
  const [cuidadores, setCuidadores] = useState<Cuidador[]>([])
  const [cuidadoresFiltrados, setCuidadoresFiltrados] = useState<Cuidador[]>([])
  const [busca, setBusca] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const router = useRouter()

  const [filtros, setFiltros] = useState<FiltrosAtivos>({
    especialidades: [],
    precoMin: 0,
    precoMax: 100,
    distanciaMax: 50,
    avaliacaoMin: 0,
    disponibilidade: [],
    turnos: [],
    ordenacao: "relevancia",
  })

  useEffect(() => {
    // Verificar se o usuário está logado e é um cliente
    const userType = localStorage.getItem("userType")
    const email = localStorage.getItem("userEmail")

    if (!userType || userType !== "cliente") {
      router.push("/login")
      return
    }

    setUserEmail(email || "")

    // Dados simulados de cuidadores expandidos
    const cuidadoresData: Cuidador[] = [
      {
        id: "1",
        nome: "Júlia Castro",
        idade: 32,
        cidade: "São Paulo, SP",
        experiencia: "5 anos de experiência em cuidados geriátricos",
        especialidades: ["Alzheimer", "Diabetes", "Fisioterapia"],
        disponibilidade: ["casa", "hospital"],
        turno: ["manha", "tarde"],
        avaliacao: 4.9,
        numeroAvaliacoes: 47,
        precoHora: 45,
        distancia: 2.1,
        verificado: true,
      },
      {
        id: "2",
        nome: "Carlos Silva",
        idade: 28,
        cidade: "São Paulo, SP",
        experiencia: "3 anos especializados em cuidados domiciliares",
        especialidades: ["Hipertensão", "Mobilidade Reduzida", "Medicamentos"],
        disponibilidade: ["casa"],
        turno: ["tarde", "noite"],
        avaliacao: 4.7,
        numeroAvaliacoes: 32,
        precoHora: 35,
        distancia: 3.5,
        verificado: true,
      },
      {
        id: "3",
        nome: "Ana Rodrigues",
        idade: 45,
        cidade: "São Paulo, SP",
        experiencia: "8 anos em enfermagem geriátrica",
        especialidades: ["Pós-cirúrgico", "Curativos", "Administração de Medicamentos"],
        disponibilidade: ["hospital", "casa"],
        turno: ["manha", "tarde", "noite"],
        avaliacao: 5.0,
        numeroAvaliacoes: 63,
        precoHora: 55,
        distancia: 1.8,
        verificado: true,
      },
      {
        id: "4",
        nome: "Roberto Santos",
        idade: 38,
        cidade: "São Paulo, SP",
        experiencia: "6 anos em cuidados especializados",
        especialidades: ["Diabetes", "Acompanhamento Médico", "Cuidados Básicos"],
        disponibilidade: ["casa"],
        turno: ["manha"],
        avaliacao: 4.6,
        numeroAvaliacoes: 28,
        precoHora: 40,
        distancia: 5.2,
        verificado: true,
      },
      {
        id: "5",
        nome: "Fernanda Lima",
        idade: 29,
        cidade: "São Paulo, SP",
        experiencia: "4 anos em fisioterapia geriátrica",
        especialidades: ["Fisioterapia", "Mobilidade Reduzida", "Alzheimer"],
        disponibilidade: ["casa", "hospital"],
        turno: ["tarde", "noite"],
        avaliacao: 4.8,
        numeroAvaliacoes: 41,
        precoHora: 50,
        distancia: 4.1,
        verificado: true,
      },
      {
        id: "6",
        nome: "Pedro Oliveira",
        idade: 35,
        cidade: "São Paulo, SP",
        experiencia: "7 anos em cuidados intensivos",
        especialidades: ["Pós-cirúrgico", "Medicamentos", "Hipertensão"],
        disponibilidade: ["hospital"],
        turno: ["noite"],
        avaliacao: 4.4,
        numeroAvaliacoes: 19,
        precoHora: 60,
        distancia: 6.8,
        verificado: false,
      },
    ]

    setCuidadores(cuidadoresData)
    setCuidadoresFiltrados(cuidadoresData)
  }, [router])

  // Aplicar filtros
  useEffect(() => {
    let resultado = [...cuidadores]

    // Filtro por busca
    if (busca) {
      resultado = resultado.filter(
        (cuidador) =>
          cuidador.nome.toLowerCase().includes(busca.toLowerCase()) ||
          cuidador.especialidades.some((esp) => esp.toLowerCase().includes(busca.toLowerCase())),
      )
    }

    // Filtro por especialidades
    if (filtros.especialidades.length > 0) {
      resultado = resultado.filter((cuidador) =>
        filtros.especialidades.some((esp) => cuidador.especialidades.includes(esp)),
      )
    }

    // Filtro por preço
    resultado = resultado.filter(
      (cuidador) => cuidador.precoHora >= filtros.precoMin && cuidador.precoHora <= filtros.precoMax,
    )

    // Filtro por distância
    resultado = resultado.filter((cuidador) => cuidador.distancia <= filtros.distanciaMax)

    // Filtro por avaliação
    resultado = resultado.filter((cuidador) => cuidador.avaliacao >= filtros.avaliacaoMin)

    // Filtro por disponibilidade
    if (filtros.disponibilidade.length > 0) {
      resultado = resultado.filter((cuidador) =>
        filtros.disponibilidade.some((disp) => cuidador.disponibilidade.includes(disp)),
      )
    }

    // Filtro por turnos
    if (filtros.turnos.length > 0) {
      resultado = resultado.filter((cuidador) => filtros.turnos.some((turno) => cuidador.turno.includes(turno)))
    }

    // Ordenação
    switch (filtros.ordenacao) {
      case "preco-menor":
        resultado.sort((a, b) => a.precoHora - b.precoHora)
        break
      case "preco-maior":
        resultado.sort((a, b) => b.precoHora - a.precoHora)
        break
      case "avaliacao":
        resultado.sort((a, b) => b.avaliacao - a.avaliacao)
        break
      case "distancia":
        resultado.sort((a, b) => a.distancia - b.distancia)
        break
      default:
        // Relevância (verificados primeiro, depois por avaliação)
        resultado.sort((a, b) => {
          if (a.verificado && !b.verificado) return -1
          if (!a.verificado && b.verificado) return 1
          return b.avaliacao - a.avaliacao
        })
    }

    setCuidadoresFiltrados(resultado)
  }, [cuidadores, busca, filtros])

  const handleFiltroEspecialidade = (especialidade: string, checked: boolean) => {
    setFiltros((prev) => ({
      ...prev,
      especialidades: checked
        ? [...prev.especialidades, especialidade]
        : prev.especialidades.filter((esp) => esp !== especialidade),
    }))
  }

  const handleFiltroDisponibilidade = (disponibilidade: string, checked: boolean) => {
    setFiltros((prev) => ({
      ...prev,
      disponibilidade: checked
        ? [...prev.disponibilidade, disponibilidade]
        : prev.disponibilidade.filter((disp) => disp !== disponibilidade),
    }))
  }

  const handleFiltroTurno = (turno: string, checked: boolean) => {
    setFiltros((prev) => ({
      ...prev,
      turnos: checked ? [...prev.turnos, turno] : prev.turnos.filter((t) => t !== turno),
    }))
  }

  const limparFiltros = () => {
    setFiltros({
      especialidades: [],
      precoMin: 0,
      precoMax: 100,
      distanciaMax: 50,
      avaliacaoMin: 0,
      disponibilidade: [],
      turnos: [],
      ordenacao: "relevancia",
    })
    setBusca("")
  }

  const contarFiltrosAtivos = () => {
    let count = 0
    if (filtros.especialidades.length > 0) count++
    if (filtros.precoMin > 0 || filtros.precoMax < 100) count++
    if (filtros.distanciaMax < 50) count++
    if (filtros.avaliacaoMin > 0) count++
    if (filtros.disponibilidade.length > 0) count++
    if (filtros.turnos.length > 0) count++
    return count
  }

  const handleContatar = (cuidadorId: string) => {
    console.log("Solicitando contato com cuidador:", cuidadorId)
    alert("Solicitação de contato enviada! O cuidador receberá sua mensagem.")
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    router.push("/")
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

  const filtrosAtivos = contarFiltrosAtivos()

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
              <Badge className="bg-purple-100 text-purple-800">Cliente</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/perfil/cliente">Meu Perfil</Link>
              </Button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Encontre seu Cuidador</h1>
          <p className="text-gray-600">Descubra cuidadores qualificados e verificados na sua região</p>
        </div>

        {/* Busca e Filtros */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou especialidade..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            <Sheet open={filtrosAbertos} onOpenChange={setFiltrosAbertos}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative bg-transparent">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {filtrosAtivos > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-purple-600 text-white text-xs">
                      {filtrosAtivos}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtros Avançados</SheetTitle>
                  <SheetDescription>Refine sua busca para encontrar o cuidador ideal</SheetDescription>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                  {/* Ordenação */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Ordenar por</Label>
                    <Select
                      value={filtros.ordenacao}
                      onValueChange={(value: any) => setFiltros((prev) => ({ ...prev, ordenacao: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevancia">Relevância</SelectItem>
                        <SelectItem value="preco-menor">Menor Preço</SelectItem>
                        <SelectItem value="preco-maior">Maior Preço</SelectItem>
                        <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
                        <SelectItem value="distancia">Menor Distância</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preço */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Faixa de Preço (R$/hora)
                    </Label>
                    <div className="px-2">
                      <Slider
                        value={[filtros.precoMin, filtros.precoMax]}
                        onValueChange={([min, max]) =>
                          setFiltros((prev) => ({ ...prev, precoMin: min, precoMax: max }))
                        }
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>R$ {filtros.precoMin}</span>
                        <span>R$ {filtros.precoMax}</span>
                      </div>
                    </div>
                  </div>

                  {/* Distância */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <MapIcon className="h-4 w-4" />
                      Distância Máxima
                    </Label>
                    <div className="px-2">
                      <Slider
                        value={[filtros.distanciaMax]}
                        onValueChange={([value]) => setFiltros((prev) => ({ ...prev, distanciaMax: value }))}
                        max={50}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-center text-sm text-gray-500 mt-2">Até {filtros.distanciaMax} km</div>
                    </div>
                  </div>

                  {/* Avaliação Mínima */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Avaliação Mínima
                    </Label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 4.5, 4.8].map((rating) => (
                        <Button
                          key={rating}
                          variant={filtros.avaliacaoMin === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFiltros((prev) => ({ ...prev, avaliacaoMin: rating }))}
                          className="flex items-center gap-1"
                        >
                          <Star className="h-3 w-3" />
                          {rating === 0 ? "Todas" : rating}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Especialidades */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Especialidades</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {ESPECIALIDADES_DISPONIVEIS.map((especialidade) => (
                        <div key={especialidade} className="flex items-center space-x-2">
                          <Checkbox
                            id={`esp-${especialidade}`}
                            checked={filtros.especialidades.includes(especialidade)}
                            onCheckedChange={(checked) => handleFiltroEspecialidade(especialidade, checked as boolean)}
                          />
                          <Label htmlFor={`esp-${especialidade}`} className="text-sm">
                            {especialidade}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disponibilidade */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Local de Atendimento</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disp-casa"
                          checked={filtros.disponibilidade.includes("casa")}
                          onCheckedChange={(checked) => handleFiltroDisponibilidade("casa", checked as boolean)}
                        />
                        <Label htmlFor="disp-casa">Casa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disp-hospital"
                          checked={filtros.disponibilidade.includes("hospital")}
                          onCheckedChange={(checked) => handleFiltroDisponibilidade("hospital", checked as boolean)}
                        />
                        <Label htmlFor="disp-hospital">Hospital</Label>
                      </div>
                    </div>
                  </div>

                  {/* Turnos */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Turnos Disponíveis</Label>
                    <div className="flex gap-4">
                      {[
                        { key: "manha", label: "Manhã" },
                        { key: "tarde", label: "Tarde" },
                        { key: "noite", label: "Noite" },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`turno-${key}`}
                            checked={filtros.turnos.includes(key)}
                            onCheckedChange={(checked) => handleFiltroTurno(key, checked as boolean)}
                          />
                          <Label htmlFor={`turno-${key}`}>{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={limparFiltros} className="flex-1 bg-transparent">
                      Limpar Filtros
                    </Button>
                    <Button onClick={() => setFiltrosAbertos(false)} className="flex-1">
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Filtros Ativos */}
          {filtrosAtivos > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filtros.especialidades.map((esp) => (
                <Badge key={esp} variant="secondary" className="flex items-center gap-1">
                  {esp}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleFiltroEspecialidade(esp, false)} />
                </Badge>
              ))}
              {(filtros.precoMin > 0 || filtros.precoMax < 100) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  R$ {filtros.precoMin} - R$ {filtros.precoMax}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFiltros((prev) => ({ ...prev, precoMin: 0, precoMax: 100 }))}
                  />
                </Badge>
              )}
              {filtros.distanciaMax < 50 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Até {filtros.distanciaMax}km
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFiltros((prev) => ({ ...prev, distanciaMax: 50 }))}
                  />
                </Badge>
              )}
              {filtros.avaliacaoMin > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> {filtros.avaliacaoMin}+
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFiltros((prev) => ({ ...prev, avaliacaoMin: 0 }))}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{cuidadoresFiltrados.length}</p>
                <p className="text-sm text-gray-600">Resultados Encontrados</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  R${" "}
                  {cuidadoresFiltrados.length > 0
                    ? Math.round(
                        cuidadoresFiltrados.reduce((acc, c) => acc + c.precoHora, 0) / cuidadoresFiltrados.length,
                      )
                    : 0}
                </p>
                <p className="text-sm text-gray-600">Preço Médio</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {cuidadoresFiltrados.length > 0
                    ? (
                        cuidadoresFiltrados.reduce((acc, c) => acc + c.avaliacao, 0) / cuidadoresFiltrados.length
                      ).toFixed(1)
                    : 0}
                </p>
                <p className="text-sm text-gray-600">Avaliação Média</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {cuidadoresFiltrados.filter((c) => c.verificado).length}
                </p>
                <p className="text-sm text-gray-600">Verificados</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Cuidadores */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {cuidadoresFiltrados.length > 0 ? "Cuidadores Encontrados" : "Nenhum resultado encontrado"}
            </h2>
            {cuidadoresFiltrados.length > 0 && (
              <p className="text-gray-600">
                Mostrando {cuidadoresFiltrados.length} de {cuidadores.length} cuidadores
              </p>
            )}
          </div>

          {cuidadoresFiltrados.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cuidador encontrado</h3>
                <p className="text-gray-600 mb-4">Tente ajustar os filtros ou ampliar os critérios de busca.</p>
                <Button onClick={limparFiltros} variant="outline">
                  Limpar Todos os Filtros
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {cuidadoresFiltrados.map((cuidador) => (
                <Card key={cuidador.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={cuidador.foto || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg">
                          {cuidador.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold text-gray-900">{cuidador.nome}</h3>
                              {cuidador.verificado && (
                                <Badge className="bg-green-100 text-green-800 text-xs">Verificado</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{cuidador.idade} anos</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {cuidador.cidade} • {cuidador.distancia}km
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{cuidador.avaliacao}</span>
                                <span className="text-gray-400">({cuidador.numeroAvaliacoes} avaliações)</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">R$ {cuidador.precoHora}</p>
                            <p className="text-sm text-gray-600">por hora</p>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{cuidador.experiencia}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Especialidades:</h4>
                            <div className="flex flex-wrap gap-1">
                              {cuidador.especialidades.map((esp) => (
                                <Badge key={esp} variant="outline" className="text-xs">
                                  {esp}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Disponibilidade:</h4>
                            <p className="text-sm text-gray-600">{formatDisponibilidade(cuidador.disponibilidade)}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Turnos:</h4>
                            <div className="flex gap-1">
                              {cuidador.turno.map((turno) => (
                                <Badge key={turno} variant="outline" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatTurno([turno])}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/cuidador/${cuidador.id}`}>Ver Perfil Completo</Link>
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleContatar(cuidador.id)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Solicitar Contato
                          </Button>
                        </div>
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
