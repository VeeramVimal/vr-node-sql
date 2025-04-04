class JobQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    addJob = (job) => {
        this.queue.push(job);
        this.processQueue()
    }

    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;
        // while (this.queue.length > 0) {
        //     const job = this.queue.shift();
        //     if (job) {
        //         try {
        //             await job()
        //         } catch (error) {
        //             console.error('Job failed:', error);
        //         }
        //     }
        // }
        while (this.queue.length > 0) {
            const {job, resolve, reject} = this.queue.shift();
            if (job) {
                try {
                   const result = await job();
                   resolve(result);
                } catch (error) {
                    console.error('Job failed:', error);
                    reject(error);
                }
            }
        }
        this.isProcessing = false;

    }
}