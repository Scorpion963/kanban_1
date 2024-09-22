'use client'

import { useEffect } from "react"
import { useTask } from "~/hooks/TasksProvider"

export default function ActivateTaskContext ({id}: {id: string}) {
    const {setBoard} = useTask()
    setBoard(id)
    return <></>
} 