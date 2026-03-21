import { Button } from "@/components/ui/button";
import Hero from "@/assets/imagem-hero.svg"

export function Home() {

    return (
        <main className="min-h-screen flex justify-center items-center p-10">
            <section className="mx-auto px-6 py-16 grid gap-12 lg:grid-cols-2 items-center">
                <header>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Organize suas tarefas com simplicidade
                    </h1>
                    <p className="text-lg py-2">
                        Um aplicativo simples para gerenciar suas tarefas diárias,
                        aumentar sua produtividade e manter tudo sob controle
                    </p>
                    <div className="flex gap-4 py-4">
                        <Button size="lg">Fazer Login</Button>
                        <Button size="lg" variant="outline">Criar Conta</Button>
                    </div>
                </header>
                <figure className="flex justify-center">
                    <img
                        src={Hero}
                        alt="Aplicativo de gerenciamento de tarefas com pessoa exibindo um calendário e a sua gestão de tempo"
                        className="w-full max-w-md"
                    >
                    </img>
                </figure>
            </section>
        </main>
    )
}