import { useState, useEffect, useRef } from 'react'
import { queryClient, GetQuests } from 'services'
import { dehydrate, useQuery } from 'react-query'
import { Quest } from 'generated/graphql'
import { getContentFragment } from 'lib'
import { gsap } from "gsap";
import { links } from 'pages'
import {QuestLogBanner} from 'components'
import dynamic from 'next/dynamic'


const ScrollTrigger = dynamic(() => import('gsap/ScrollTrigger'), {ssr: false})


const QuestSelectionWidget = ({quests, selectedQuest, setSelectedQuest, isMenuOpen,setMenuOpen}:
                              {quests: Array<Quest>,
                                  selectedQuest: Quest | null,
                                  setSelectedQuest: (arg0: Quest) => void
                                  isMenuOpen: boolean
                                  setMenuOpen: (arg0: boolean) => void
                              }) => {
    // useEffect(() => {
    //     if(isMenuOpen)
    //         gsap.to('mobile-selection-widget', {left: '0vw'})
    //     else
    //         gsap.to('mobile-selection-widget', {left: '100vw'})
    // }, [isMenuOpen])                                        



    return (
        <>
        <div id='selection-widget' className="md:hidden flex flex-col px-2 h-full overflowY-scroll w-full" style={{
                  backgroundImage: 'url(/dndbackground.jpg)',
                  backgroundPosition: '50% 50%',
                  display: isMenuOpen ? 'flex' : 'none',
                zIndex: 2
        }}>
            {quests.map(quest => (
                <div onClick={() => {setSelectedQuest(quest); setMenuOpen(false) }}
                     className={`shadow-md flex flex-col border border-1 p-4 m-1 cursor-pointer rounded-md
                         ${selectedQuest == quest 
                             ? 'border-blue-500 text-blue-500' 
                             : 'border-dnd'}`}>
                    <div className="text-xl font-bold">{quest.title}</div>
                    <div className="text-lg font-light">{quest.shortDescription}</div>
                </div>
            ))}
        </div>
        <div id='selection-widget' className="hidden md:block scrollbar flex flex-col px-2" style={{minHeight: '95vh', overflowY: 'scroll'}}>
            {quests.map(quest => (
                <div onClick={() => setSelectedQuest(quest)}
                     className={`shadow-md flex flex-col border border-1 p-4 m-1 cursor-pointer rounded-md
                         ${selectedQuest == quest 
                             ? 'border-blue-500 text-blue-500' 
                             : 'border-dnd'}`}>
                    <div className="text-xl font-bold">{quest.title}</div>
                    <div className="text-lg font-light">{quest.shortDescription}</div>
                </div>
            ))}
        </div>
        </>
    )

}

const QuestDetail = ({quest, setMenuOpen, isMenuOpen}: {quest: Quest | null, isMenuOpen: boolean,  setMenuOpen: (arg0: boolean) => void}) => {
    return (
        <div className="flex flex-col p-8" id='quest-detail' style={{
            display: isMenuOpen ? 'none' : 'flex'
        }}>
            <div className="text-5xl font-bold text-dnd text-dnd-light">{quest?.title}</div>
            <div>
                <div className={`my-4 py-2 px-4 rounded-2xl inline-block font-bold ${quest?.questStatus == 'Active' ? 'bg-green-200 text-green-700' : quest?.questStatus == 'Completed' ? 'bg-blue-200 text-blue-700' : 'bg-gray-300'}`}>{quest?.questStatus}</div>
            </div>
            <div className="text-xl">{quest?.shortDescription ? `-${quest.shortDescription}` : '...'}</div>
            <div className="border-b border-b-1 border-b-stone-700 w-full my-4"></div>
            <div className="text-xl">
                {quest?.content?.json?.children?.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item, null))

                    return getContentFragment(index, children,typeObj, typeObj.type)
                })}
            </div>
            
        </div>
    )
}


const QuestLogView = () => {
    const { data } = useQuery('quests', () => GetQuests());
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
    const [isMenuOpen, setMenuOpen] = useState(true);
    gsap.registerPlugin(ScrollTrigger);
        const t1 = gsap.timeline()

    useEffect(() => {
        t1.fromTo('#selection-widget > div', {y: 20, opacity: 0}, {y: 0, opacity: 1, stagger: 0.1} )
        t1.fromTo('#quest-detail *', {y: 20, opacity: 0}, {y: 0, opacity: 1}, '>-0.2')
    }, [])


    useEffect(() => {
        setSelectedQuest(data.quests[0])
    }, [data])

    return (
        <>

        <QuestLogBanner links={links}/>
        <div className="container mx-auto">
            <div className="grid grid-cols-12 md:py-8 text-dnd text-dnd-color pb-5">
                <span className="material-symbols-outlined md:hidden fixed rounded-lg" onClick={() => setMenuOpen(true)} style={{opacity: isMenuOpen ? '0' : '1', zIndex: 3, fontSize: '4em', bottom: '1rem', left: '1rem', backgroundColor: '#402e44'}}> chevron_left </span>
                <div className="col-span-12 md:col-span-3">
                    <QuestSelectionWidget quests={data?.quests || []} 
                                            selectedQuest={selectedQuest} 
                                            setSelectedQuest={setSelectedQuest}
                                            setMenuOpen={setMenuOpen}
                                            isMenuOpen={isMenuOpen} />
                </div>
                <div className="col-span-12 md:col-span-9">
                    <QuestDetail quest={selectedQuest}
                                setMenuOpen={setMenuOpen}
                                isMenuOpen={isMenuOpen}/>
                </div>
            </div>
        </div>
        <style global jsx>{`
                html,
                body {
                  background-image: url(/dndbackground.jpg);
                  background-position: 50% 50%;
                }
        `}</style>
        </>
    )
}

export async function getServerSideProps() {
    await queryClient.prefetchQuery('quests', () => GetQuests())

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }

}

export default QuestLogView;
