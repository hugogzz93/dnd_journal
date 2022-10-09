import { useState } from 'react'
import { queryClient, GetQuests } from 'services'
import { dehydrate, useQuery } from 'react-query'
import { Quest } from 'generated/graphql'
import { getContentFragment } from 'lib'
import { Head } from 'next/document'

import { links } from 'pages'
import {QuestLogBanner} from 'components'

const QuestSelectionWidget = ({quests, selectedQuest, setSelectedQuest}:
                              {quests: Array<Quest>,
                                  selectedQuest: Quest | null,
                                  setSelectedQuest: (arg0: Quest) => void}) => {
    return (
        <div id='style-3' className="scrollbar flex flex-col px-2" style={{height: '95vh', overflowY: 'scroll'}}>
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
    )

}

const QuestDetail = ({quest}: {quest: Quest | null}) => {
    return (
        <div className="flex flex-col p-8 fade--in">
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
    return (
        <>

        <QuestLogBanner links={links}/>
        <div className="container mx-auto">
            <div className="grid grid-cols-12 py-8 text-dnd text-dnd-color">
                <div className="col-span-3">
                    <QuestSelectionWidget quests={data?.quests || []} 
                                            selectedQuest={selectedQuest} 
                                            setSelectedQuest={setSelectedQuest}/>
                </div>
                <div className="col-span-9">
                    <QuestDetail quest={selectedQuest}/>
                </div>
            </div>
        </div>
        <style global jsx>{`
                html,
                body {
                  overflow: hidden;
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
