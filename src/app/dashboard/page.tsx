import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ConfigureTab from './ConfigureTab'
import AnalyticsTab from './AnalyticsTab'

function Page() {
    return (
        <div className='min-h-screen flex flex-col items-center w-full'>
            <Tabs defaultValue="account" className="mt-10 w-2xl">
                <TabsList className='w-full '>
                    <TabsTrigger value="account">Configure</TabsTrigger>
                    <TabsTrigger value="password">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="account"><ConfigureTab /></TabsContent>
                <TabsContent value="password"><AnalyticsTab /></TabsContent>
            </Tabs>

        </div>
    )
}

export default Page
