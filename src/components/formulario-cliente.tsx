"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, Upload, ArrowLeft } from "lucide-react"

interface FormularioClienteProps {
  onBack: () => void
  onSubmit: (dados: any) => void
}

export function FormularioCliente({ onBack, onSubmit }: FormularioClienteProps) {
  const [formData, setFormData] = useState({
    cuidadosPara: "voce" as "voce" | "familiar",
    nome: "",
    cpf: "",
    idade: "",
    cidade: "",
    condicoesSaude: "",
    local: [] as string[],
    horario: [] as string[],
    foto: null as File | null,
  })

  const handleLocalChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        local: [...prev.local, value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        local: prev.local.filter((item) => item !== value),
      }))
    }
  }

  const handleHorarioChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        horario: [...prev.horario, value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        horario: prev.horario.filter((item) => item !== value),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, foto: file }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">CuidandoComAmor</span>
            </div>
            <div className="w-10" />
          </div>
          <CardTitle className="text-2xl">Formulário do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Os cuidados são para:</Label>
              <RadioGroup
                value={formData.cuidadosPara}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, cuidadosPara: value as "voce" | "familiar" }))
                }
                className="flex gap-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="voce" id="voce" />
                  <Label htmlFor="voce">Você</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="familiar" id="familiar" />
                  <Label htmlFor="familiar">Familiar</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome:</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                  required
                  className="rounded-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF:</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cpf: e.target.value }))}
                  placeholder="000.000.000-00"
                  required
                  className="rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idade">Idade:</Label>
                <Input
                  id="idade"
                  type="number"
                  value={formData.idade}
                  onChange={(e) => setFormData((prev) => ({ ...prev, idade: e.target.value }))}
                  required
                  className="rounded-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade:</Label>
                <Input
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cidade: e.target.value }))}
                  required
                  className="rounded-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condicoesSaude">Condições de saúde:</Label>
              <Textarea
                id="condicoesSaude"
                value={formData.condicoesSaude}
                onChange={(e) => setFormData((prev) => ({ ...prev, condicoesSaude: e.target.value }))}
                placeholder="Descreva as condições de saúde e necessidades específicas"
                className="rounded-lg"
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Local:</Label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="local-hospital"
                    checked={formData.local.includes("hospital")}
                    onCheckedChange={(checked) => handleLocalChange("hospital", checked as boolean)}
                  />
                  <Label htmlFor="local-hospital">Hospital</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="local-casa"
                    checked={formData.local.includes("casa")}
                    onCheckedChange={(checked) => handleLocalChange("casa", checked as boolean)}
                  />
                  <Label htmlFor="local-casa">Casa</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Horário:</Label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="horario-manha"
                    checked={formData.horario.includes("manha")}
                    onCheckedChange={(checked) => handleHorarioChange("manha", checked as boolean)}
                  />
                  <Label htmlFor="horario-manha">Manhã</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="horario-tarde"
                    checked={formData.horario.includes("tarde")}
                    onCheckedChange={(checked) => handleHorarioChange("tarde", checked as boolean)}
                  />
                  <Label htmlFor="horario-tarde">Tarde</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="horario-noite"
                    checked={formData.horario.includes("noite")}
                    onCheckedChange={(checked) => handleHorarioChange("noite", checked as boolean)}
                  />
                  <Label htmlFor="horario-noite">Noite</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foto-cliente">Foto:</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="foto-cliente"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="rounded-full"
                />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <Button type="submit" className="w-full rounded-full bg-purple-600 hover:bg-purple-700">
              Continuar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
