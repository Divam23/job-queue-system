const isValidJobStatus = (current, next)=>{
    const transitions = {
        PENDING: ["PROCESING"],
        PROCESSING: ["COMPLETED", "FAILED"],
        COMPLETED: [],
        FAILED: []
    }

    return transitions[current]?.includes(next)
}

export {isValidJobStatus}