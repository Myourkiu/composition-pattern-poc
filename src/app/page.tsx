'use client'
import { Check, FlaskConical, X } from "lucide-react";
import { Notification } from "./components/notification";

export default function Home() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="bg-[#222224] w-[400px] h-[430px] rounded-md flex flex-col">
        <header className="flex justify-around w-full p-4">
          <p className="font-semibold text-sm">Notificações</p>
          <p className="text-emerald-500 font-semibold text-sm">Marcar todas como vistas</p>
        </header>
        <main>
          <div className="flex flex-col">
            <p className="text-sm bg-[#0d0d0d] font-semibold p-2 text-[#6e6d6f]">Recentes</p>
            <div className="divide-y divide-zinc-800">
            <Notification.Root>
              <Notification.Icon icon={FlaskConical}/>
              <Notification.Content text="Sua aula de química atrasou."/>
            </Notification.Root>
            <Notification.Root>
              <Notification.Icon icon={FlaskConical}/>
              <Notification.Content text="Gostaria de entrar no grupo?"/>
              <Notification.Actions>
                <Notification.Action action={() => console.log("action1")} icon={X} className="bg-red-500"/>
                <Notification.Action action={() => console.log("action1")} icon={Check} className="bg-emerald-600"/>
              </Notification.Actions>
            </Notification.Root>
            </div>
          </div>
          
          <div className="flex flex-col">
            <p className="text-sm bg-[#0d0d0d] font-semibold p-2 text-[#6e6d6f]">Antigas</p>
            <div className="divide-y divide-zinc-800">
            <Notification.Root>
              <Notification.Icon icon={FlaskConical}/>
              <Notification.Content text="Você recebeu uma notificação."/>
              <Notification.Actions>
                <Notification.Action action={() => console.log("action1")} icon={X} className="bg-red-500"/>
              </Notification.Actions>
            </Notification.Root>
            <Notification.Root>
              <Notification.Icon icon={FlaskConical}/>
              <Notification.Content text="Você recebeu uma notificação."/>
              <Notification.Actions>
                <Notification.Action action={() => console.log("action2")} icon={Check} className="bg-emerald-600"/>
              </Notification.Actions>
            </Notification.Root>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
