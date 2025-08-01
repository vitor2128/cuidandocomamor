"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)

    // Simulação de login - aqui você integraria com seu backend
    setTimeout(() => {
      // Simulando diferentes tipos de usuário baseado no email
      if (email.includes("cuidador")) {
        localStorage.setItem("userType", "cuidador")
        localStorage.setItem("userEmail", email)
        router.push("/dashboard/cuidador")
      } else {
        localStorage.setItem("userType", "cliente")
        localStorage.setItem("userEmail", email)
        router.push("/dashboard/cliente")
      }
      setCarregando(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">CuidandoComAmor</span>
          </div>
          <CardTitle className="text-2xl">LOGIN</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Nome do usuário</Label>
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
              <div className="relative">
                <Input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="rounded-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full rounded-full bg-blue-600 hover:bg-blue-700" disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center">
              <Link href="/cadastro" className="text-sm text-blue-600 hover:underline">
                Não tem conta? Cadastre-se
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500">
              <p>Para testar:</p>
              <p>Cuidador: cuidador@teste.com</p>
              <p>Cliente: cliente@teste.com</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
