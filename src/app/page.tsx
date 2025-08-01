import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, Star, CheckCircle, Phone, Mail, MapPin, Clock, Award, UserCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CuidadoresLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Heart className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">CuidandoComAmor</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#cuidadores" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Para Cuidadores
          </Link>
          <Link href="#familias" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Para Famílias
          </Link>
          <Link href="#como-funciona" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Como Funciona
          </Link>
          <Link href="#contato" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Contato
          </Link>
        </nav>
        <div className="ml-6 flex gap-2">
          <Button variant="outline" size="sm">
            Entrar
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Cadastrar
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Plataforma Confiável</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Conectamos famílias com cuidadores qualificados
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Uma plataforma segura e intuitiva para encontrar cuidadores experientes ou oportunidades de trabalho
                    no cuidado de idosos. Facilitamos contratos formais e oferecemos suporte completo.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/login">
                      <Users className="mr-2 h-4 w-4" />
                      Encontrar Cuidador
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Sou Cuidador
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Cuidadores verificados</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Contratos seguros</span>
                  </div>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                width="600"
                height="400"
                alt="Cuidador profissional auxiliando idoso"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-blue-100">Cuidadores Cadastrados</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1200+</div>
                <div className="text-blue-100">Famílias Atendidas</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-blue-100">Avaliação Média</div>
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-blue-100">Satisfação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Para Cuidadores Section */}
        <section id="cuidadores" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Para Cuidadores</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                    Expanda sua carreira no cuidado
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed">
                    Conecte-se com famílias que precisam dos seus serviços. Nossa plataforma oferece visibilidade,
                    contratos formais e suporte para crescer profissionalmente.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Perfil profissional completo com avaliações</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Contratos formalizados e orientação legal</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Flexibilidade de horários e localização</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Suporte contínuo e capacitação</span>
                  </li>
                </ul>
                <Button size="lg" className="w-fit bg-green-600 hover:bg-green-700">
                  Cadastrar como Cuidador
                </Button>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                width="500"
                height="400"
                alt="Cuidador profissional"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* Para Famílias Section */}
        <section id="familias" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[500px_1fr] lg:gap-12">
              <Image
                src="/placeholder.svg?height=400&width=500"
                width="500"
                height="400"
                alt="Família com idoso e cuidador"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Para Famílias</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                    Encontre o cuidador ideal
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed">
                    Busque cuidadores qualificados e verificados para seu ente querido. Nossa plataforma facilita a
                    escolha com perfis detalhados e avaliações reais.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <span>Cuidadores com background verificado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-purple-600" />
                    <span>Avaliações e referências de outros clientes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>Disponibilidade flexível de horários</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span>Profissionais com certificações</span>
                  </li>
                </ul>
                <Button size="lg" className="w-fit bg-purple-600 hover:bg-purple-700">
                  Encontrar Cuidador
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section id="como-funciona" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Como funciona nossa plataforma
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Um processo simples e seguro para conectar cuidadores e famílias
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>1. Cadastro e Verificação</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Cuidadores criam perfis completos com documentos, certificações e referências. Famílias descrevem
                    suas necessidades específicas.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>2. Conexão Inteligente</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Nossa plataforma conecta famílias com cuidadores compatíveis baseado em localização, experiência,
                    horários e necessidades específicas.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>3. Contrato Seguro</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Facilitamos a formalização do trabalho com contratos padronizados, orientações legais e suporte
                    contínuo para ambas as partes.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  O que dizem nossos usuários
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Histórias reais de famílias e cuidadores que encontraram sucesso em nossa plataforma
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      width="60"
                      height="60"
                      alt="Maria Silva"
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">Maria Silva</CardTitle>
                      <CardDescription>Filha de idoso</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "Encontrei a Júlia através da plataforma e foi a melhor decisão. Ela cuida do meu pai com tanto
                    carinho e profissionalismo. A plataforma facilitou todo o processo."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      width="60"
                      height="60"
                      alt="Júlia Castro"
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">Júlia Castro</CardTitle>
                      <CardDescription>Cuidadora profissional</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "A plataforma me ajudou a expandir minha clientela de forma segura. Os contratos formalizados me dão
                    tranquilidade e as famílias confiam mais no meu trabalho."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pronto para começar?</h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed">
                  Junte-se à nossa comunidade de cuidadores e famílias. Cadastre-se gratuitamente e comece hoje mesmo.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                  <Link href="/login">
                    <Users className="mr-2 h-4 w-4" />
                    Sou uma Família
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  asChild
                >
                  <Link href="/login">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Sou um Cuidador
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contato"
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50"
      >
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-lg font-bold text-gray-900">CuidandoComAmor</span>
              </div>
              <p className="text-sm text-gray-600">
                Conectando famílias e cuidadores com segurança e profissionalismo.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">Contato</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 9999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@cuidandocomamor.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">Links Úteis</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="text-gray-600 hover:text-blue-600 block">
                  Como Funciona
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 block">
                  Segurança
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 block">
                  Suporte
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 block">
                  Blog
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="text-gray-600 hover:text-blue-600 block">
                  Termos de Uso
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 block">
                  Política de Privacidade
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 block">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} CuidandoComAmor. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
