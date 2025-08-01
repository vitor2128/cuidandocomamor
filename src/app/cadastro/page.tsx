"use client"

import { useState } from "react"
import { CadastroInicial } from "@/components/cadastro-inicial"
import { FormularioCuidador } from "@/components/formulario-cuidador"
import { FormularioCliente } from "@/components/formulario-cliente"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart } from "lucide-react"
import Link from "next/link"

type Etapa = "inicial" | "formulario" | "sucesso"
type TipoUsuario = "cuidador" | "cliente" | null

export default function CadastroPage() {
  const [etapa, setEtapa] = useState<Etapa>("inicial")
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>(null)
  const [dadosIniciais, setDadosIniciais] = useState<{ email: string; senha: string } | null>(null)

  const handleInicialNext = (tipo: "cuidador" | "cliente", dados: { email: string; senha: string }) => {
    setTipoUsuario(tipo)
    setDadosIniciais(dados)
    setEtapa("formulario")
  }

  const handleFormularioSubmit = (dadosFormulario: any) => {
    // Aqui você salvaria os dados no backend
    console.log("Dados completos:", { ...dadosIniciais, ...dadosFormulario, tipo: tipoUsuario })
    setEtapa("sucesso")
  }

  const handleBack = () => {
    setEtapa("inicial")
    setTipoUsuario(null)
    setDadosIniciais(null)
  }

  if (etapa === "inicial") {
    return <CadastroInicial onNext={handleInicialNext} />
  }

  if (etapa === "formulario") {
    if (tipoUsuario === "cuidador") {
      return <FormularioCuidador onBack={handleBack} onSubmit={handleFormularioSubmit} />
    } else {
      return <FormularioCliente onBack={handleBack} onSubmit={handleFormularioSubmit} />
    }
  }

  // Página de sucesso
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">CuidandoComAmor</span>
          </div>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Cadastro Realizado!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Seu cadastro foi realizado com sucesso. Em breve você receberá um e-mail de confirmação.
          </p>
          <p className="text-sm text-gray-500">
            {tipoUsuario === "cuidador"
              ? "Agora você pode começar a receber solicitações de famílias interessadas em seus serviços."
              : "Agora você pode buscar e entrar em contato com cuidadores qualificados."}
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/login">Fazer Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/">Voltar ao Início</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
