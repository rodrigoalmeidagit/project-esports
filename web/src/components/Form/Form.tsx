import { DialogClose } from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./Input";

export function Form() {
  return (
    <form className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="game" className="font-semibold">Qual o game?</label>
        <Input
          id="game"
          placeholder='Selecione o game que deseja jogar'
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
      </div>

      {/* video 4 parou hein 01:10:16 */}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold">Seu nome (nickname)</label>
        <Input id='name' placeholder='Como te chamam dentro do game?' />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
          <Input id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord" className="font-semibold">Qual o seu Discord?</label>
          <Input id='discord' type="text" placeholder='Usuário#0000' />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
          <div className="grid grid-cols-4 gap-2">
            <button
              title="Domingo"
              className="w-8 h-8 rounded bg-zinc-900"
            >
              D
            </button>
            <button
              title="Segunda"
              className="w-8 h-8 rounded bg-zinc-900"
            >
              S
            </button>
            <button
              title="Terça"
              className="w-8 h-8 rounded bg-zinc-900"
            >
              T
            </button>
            <button
              title="Quarta"
              className="w-8 h-8 rounded bg-zinc-900"
            >
              Q
            </button>
            <button
              title="Quinta"
              className="w-8 h-8 rounded bg-zinc-900"
            >
              Q
            </button>
            <button
              title="Sexta"
              className="w-8 h-8 rounded bg-zinc-900"
            >
              S
            </button>
            <button
              title="Sábado"
              className="w-8 h-8 rounded bg-zinc-900"
            >
              S
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
          <div className="grid grid-cols-2 gap-2">
            <Input id='hourStart' type="time" placeholder='De' />
            <Input id='hourEnd' type="time" placeholder='Até' />
          </div>
        </div>
      </div>

      <div className="mt-2 flex gap-2 text-sm">
        <Input type="checkbox" />
        Costumo me conectar ao chat de voz
      </div>

      <footer className="mt-4 flex justify-end gap-4">
        <DialogClose
          type="button"
          className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
        >
          Cancelar
        </DialogClose>
        <button
          type='submit'
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
        >
          <GameController size={24} />
          Encontrar duo
        </button>
      </footer>
    </form>
  )
}