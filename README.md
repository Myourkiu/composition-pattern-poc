Esta é uma POC focada na utilização do conceito de Composition Pattern.

## O que é Composition Pattern?

Como o nome já diz, é um padrão para a composição de componentes. Este conceito é utilizado na criação de componentes onde podem ser muito customizados. No exemplo deste projeto, peguei o exemplo de notificações, onde elas podem ter ou não textos, ações e ícones, além de ter o poder de customização de cada um deles. Este tipo de estrutura é utilizado por exemplo no RadixUI.

## Como funciona?

Esta estrutura funciona de forma simples, dividindo o componente maior em partes. Neste exemplo, existia um componente maior Notification, que seria chamado da seguinte forma:

```
<Notication icon={Icon} text={Text} actions={Action1, Action2}
```

À primeira vista, não parece nada de errado e realmente não tem, caso seja algo simples. Entretanto, caso este componente precisa ser chamado de formas diferentes, o código começará a ficar sujo e confuso, pois precisará de muitas condicionais e validações.

Um exemplo disso seria a notificação possuir apenas uma ação. Neste caso, teria de deixar as actions opcionais e adicionar a validação de cada uma das possibilidades. Já com este pattern, o código ficará mais maleável, onde precisaria apenas alterar o ícone da action e a função que seria executada.

Olhe o exemplo onde precisamos trazer uma notificação com um ícone apenas:

```
//Sem o pattern

interface NotificationProps{
    (...)
    icon1?: ElementType,
    icon2?: ElementType,
}

export function Notification({action1, action2, icon1, icon2} : NotificationProps){
    //(...)
    {
        icon1 && {
            <button>
            {icon1}
            </button>
        }
    }
    {
        icon2 && {
            <button>
            {icon2}
            </button>
        }
    }

    //chamando o componente

    <Notification (...) icon1={icon1}/>
}
```

Este foi um exemplo simples onde algo simples vira uma bola de neve. Agora veja como fica o código com o pattern aplicado:

```
interface NotificationIconProps{
    icon: ElementType
}

export function NotificationIcon({icon: Icon} : NotificationIconProps){
    return(
        <Icon/>
    )
}

//chamando o componente

<Notification.Root>
    <Notification.Icon icon={icon}>
</Notification.Root>
```

## Como fazer?

Para fazer é relativamente simples, usando um exemplo com [Tailwind](https://tailwindcss.com/docs/installation).

### Passo 1 - Criar a pasta de componentes

Este modo de componentização funciona melhor em componentes gerais, onde será usado em muitos lugares e com muitas variáveis, como dito anteriormente, logo adicione uma pasta components e uma pasta onde ficarão os subcomponentes e o arquivo main dele, para melhor organização.

```
src/app/components/[pasta do componente]
```

### Passo 2 - Criar o arquivo main

Este arquivo vai ser utilizado para chamar os seus subcomponentes em um só, deixando mais limpo na hora de importar ele, pois ao invés de ter 5-10 linhas de importação, terá apenas uma chamando todos ao mesmo tempo.

Crie-o na sua pasta de subcomponentes com o nome de index.tsx, onde mais a frente será mostrado como ele será utilizado.

### Passo 3 - Criar os subcomponentes

Este passo será um pouco mais longo e requer uma certa atenção. O exemplo mostrado vai ser o .Root e o .Content para ficar mais prático.

O .Root, vai ser o container do componente, ou seja, será a parte do componente onde armazenará os outros subcomponentes dentro dele.

Crie dentro da pasta de subcomponentes com o nome de [Prefixo]Root.tsx, como mostrado abaixo:

```
interface NotificationRootProps {
  children: ReactNode;
}

export function NotificationRoot({ children }: NotificationRootProps) {
  return (
    <div className="bg-zinc-900 px-8 py-4 flex items-start gap-6">
      {children}
    </div>
  );
}
```

Agora começa a parte divertida, que são os conteúdos adicionais. Como exemplo, será utilizado o .Content, veja como funcionará no exemplo abaixo:

```
interface NotificationContentProps{
    text: string
}

export function NotificationContent({text} : NotificationContentProps){
    return(
        <div className="flex-1 flex flex-col gap-2">
            <p className="text-sm loading-relaxed text-zinc-600">{text}</p>
            <div className="text-xs text-zinc-400 flex items-center gap-1">
                <span>Enviado</span>
                <span>Há 5 min</span>
            </div>
        </div>
    )
}
```

Neste caso, o content será o texto, porém poderia colocar um outro subcomponente onde seria o responsável pelos spans, para um horário dinâmico ou até mesmo retirar o horário de envio, caso necessite.

Aqui que tudo fica interessante, pois tudo que precisar, é só criar, se existe uma notificação com ou sem botões, com ou sem ações, e entre outros, tudo será possível criar e o melhor, é a forma com a qual o componente será chamado. Mas para isso, precisa configurar o index.tsx.

### Configuração do index.tsx

Essa parte é bem simples, basta dar um export const do seu prefixo, neste caso, o prefixo ficará Notification e importar todos os outros apenas com o sufixo deles. Confira:

```
import { NotificationAction } from "./NotificationAction";
import { NotificationActions } from "./NotificationActions";
import { NotificationContent } from "./NotificationContent";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationRoot } from "./NotificationRoot";
// outros imports dos subcomponentes

export const Notification = {
    Root: NotificationRoot,
    Actions: NotificationActions,
    Icon: NotificationIcon,
    Content: NotificationContent,
    Action: NotificationAction,
    //chamada dos outros subcomponentes
}
```

### Resultado final

Como resultado final, aqui estão três exemplos que mostram, respectivamente, uma notificação com 2 actions, com 1 action e apenas com um texto.

Content + 2 Actions:

```
import { Notification } from "./components/notification";

<div>
    <Notification.Root>
        <Notification.Content (...)/>
        <Notification.Actions>
            <Notification.Action action={(...)}/>
            <Notification.Action action={(...)}/>
        </Notification.Actions>
    </Notification.Root>
</div>
```

Content + 1 Action:

```
import { Notification } from "./components/notification";

<div>
    <Notification.Root>
        <Notification.Content (...)/>
        <Notification.Actions>
            <Notification.Action action={(...)}/>
    </Notification.Root>
</div>
```

Apenas com um Content:

```
import { Notification } from "./components/notification";

<div>
    <Notification.Root>
        <Notification.Content (...)/>
    </Notification.Root>
</div>
```

### Bônus: TwMerge e sua utilização

Este tópico é talvez o mais complexo, porém te da mais liberdade quando se fala de estilização.

No exemplo a seguir, o NotificationAction precisava de estilos diferentes ao ser chamado, pois o padrão não seria o ideal. Num exemplo de botão de recusar e aceitar, o recusar seria vermelho e aceitar o verde.

Porém, como não teria como passar esses estilos do Tailwind dinamicamente, e é onde o TwMerge entra em ação. Ele permite combinar classes e resolve conflitos de classes repetidas. Por exemplo, caso no subcomponente tenha no className um w-8 e na chamada dele tenha um w-4, sem o TwMerge, teria conflito. Com o TwMerge, ele vai considerar apenas a última chamada, ou seja, iria considerar o w-4.

```
import { ButtonHTMLAttributes, ElementType } from "react"
import { twMerge } from "tailwind-merge";

interface NotificationActionProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    action: () => void,
    icon: ElementType
}

export function NotificationAction({ icon: Icon, action, ...rest }: NotificationActionProps) {
    return (
      <button {...rest} onClick={action} className={twMerge("w-8 h-8 rounded flex items-center justify-center bg-neutral-700", rest.className)}>
        <Icon className="w-4 h-4 text-white" />
      </button>
    );
  }
```

Explicando melhor o código acima

- A interface está herdando as propriedades do botão, como className, onClick, etc + as props passadas manualmente.

- O ...rest captura todas as propriedades que não foram especificadas explicitamente, ou seja, todas as propriedades, exceto as passadas manualmente (action e icon).

- No className, será passado dentro do twMerge todas as classes base e passa o rest.className para passar as classes passadas ao chamar o componete.

Na chamada do componente:

```
<Notification.Actions>
    <Notification.Action 
    action={(...)}
    icon={X}
    className="bg-red-500"
    />

    <Notification.Action 
    action={(...)} 
    icon={Check} 
    className="bg-emerald-600"
    />
</Notification.Actions>
```
Para mais informações do [TwMerge](https://github.com/dcastil/tailwind-merge/tree/v2.5.2), confira a documentação oficial.

## Conclusão

O Composition Pattern pode ser um ótimo aliado a componentes versáteis, como notificações, modais, links de navbar e sidebar, etc. Ou seja, ele lida bem com componentes de base, que serão utilizados em muitos lugares e com muitas variações, pois te da a liberdade de criá-lo da forma necessária sem ficar adicionando várias linhas de código, facilitando a manutenção e escalabiliade do código.
