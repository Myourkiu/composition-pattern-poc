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

## Conclusão

O Composition Pattern pode ser um ótimo aliado a componentes versáteis, como notificações, modais, links de navbar e sidebar, etc. Ou seja, ele lida bem com componentes de base, que serão utilizados em muitos lugares e com muitas variações, pois te da a liberdade de criá-lo da forma necessária sem ficar adicionando várias linhas de código, facilitando a manutenção e escalabiliade do código.
