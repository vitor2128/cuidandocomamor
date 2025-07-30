"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Upload, ArrowLeft } from "lucide-react"

interface FormularioCuidadorProps {
  onBack: () => void
  onSubmit: (dados: any) => void
}

export function FormularioCuidador({ onBack, onSubmit }: FormularioCuidadorProps) {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cidade: "",
    cursos: "",
    experiencia: "",
    cargaHoraria: "",
    disponibilidade: [] as string[],
    turno: [] as string[],
    foto: null as File | null,
  })

  const handleDisponibilidadeChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        disponibilidade: [...prev.disponibilidade, value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        disponibilidade: prev.disponibilidade.filter((item) => item !== value),
      }))
    }
  }

  const handleTurnoChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        turno: [...prev.turno, value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        turno: prev.turno.filter((item) => item !== value),
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
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
          <CardTitle className="text-2xl">Formulário do Cuidador</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="cursos">Cursos:</Label>
              <Textarea
                id="cursos"
                value={formData.cursos}
                onChange={(e) => setFormData((prev) => ({ ...prev, cursos: e.target.value }))}
                placeholder="Descreva seus cursos e certificações"
                className="rounded-lg"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experiencia">Experiência:</Label>
              <Textarea
                id="experiencia"
                value={formData.experiencia}
                onChange={(e) => setFormData((prev) => ({ ...prev, experiencia: e.target.value }))}
                placeholder="Descreva sua experiência profissional"
                className="rounded-lg"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargaHoraria">Carga horária:</Label>
              <Input
                id="cargaHoraria"
                value={formData.cargaHoraria}
                onChange={(e) => setFormData((prev) => ({ ...prev, cargaHoraria: e.target.value }))}
                placeholder="Ex: 8 horas/dia, 40 horas/semana"
                className="rounded-full"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Disponibilidade:</Label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hospital"
                    checked={formData.disponibilidade.includes("hospital")}
                    onCheckedChange={(checked) => handleDisponibilidadeChange("hospital", checked as boolean)}
                  />
                  <Label htmlFor="hospital">Hospital</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="casa"
                    checked={formData.disponibilidade.includes("casa")}
                    onCheckedChange={(checked) => handleDisponibilidadeChange("casa", checked as boolean)}
                  />
                  <Label htmlFor="casa">Casa</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Turno:</Label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="manha"
                    checked={formData.turno.includes("manha")}
                    onCheckedChange={(checked) => handleTurnoChange("manha", checked as boolean)}
                  />
                  <Label htmlFor="manha">Manhã</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tarde"
                    checked={formData.turno.includes("tarde")}
                    onCheckedChange={(checked) => handleTurnoChange("tarde", checked as boolean)}
                  />
                  <Label htmlFor="tarde">Tarde</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noite"
                    checked={formData.turno.includes("noite")}
                    onCheckedChange={(checked) => handleTurnoChange("noite", checked as boolean)}
                  />
                  <Label htmlFor="noite">Noite</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foto">Foto:</Label>
              <div className="flex items-center gap-4">
                <Input id="foto" type="file" accept="image/*" onChange={handleFileChange} className="rounded-full" />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <Button type="submit" className="w-full rounded-full bg-green-600 hover:bg-green-700">
              Continuar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
