"use client"

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

export default function Home() {
    return (
        <>
            <Tabs aria-label="Options" size="sm" variant="underlined">
                <Tab key="photos" title="Photos">
                    <Card className="border-0 bg-transparent stroke-transparent">
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="music" title="Music">
                    <Card>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="videos" title="Videos">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </>
    )
}