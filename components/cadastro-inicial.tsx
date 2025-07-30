"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, User, Users } from "lucide-react"

interface CadastroInicialProps {
  onNext: (tipo: "cuidador" | "cliente", dados: { email: string; senha: string }) => void
}

export function CadastroInicial({ onNext }: CadastroInicialProps) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [tipoUsuario, setTipoUsuario] = useState<"cuidador" | "cliente">("cuidador")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(tipoUsuario, { email, senha })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">CuidandoComAmor</span>
          </div>
          <CardTitle className="text-2xl">CADASTRE-SE</CardTitle>
          <CardDescription>Crie sua conta para começar a usar nossa plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="rounded-full"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Eu sou:</Label>
              <RadioGroup
                value={tipoUsuario}
                onValueChange={(value) => setTipoUsuario(value as "cuidador" | "cliente")}
                className="flex justify-center gap-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cuidador" id="cuidador" />
                  <Label htmlFor="cuidador" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Cuidador
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cliente" id="cliente" />
                  <Label htmlFor="cliente" className="flex items-center gap-2 cursor-pointer">
                    <Users className="h-4 w-4" />
                    Cliente
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
              Continuar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
