import AddResult from '@/components/Misc/AddResult'
import Head from 'next/head'
import React, { Fragment } from 'react'

export default function index() {
    return (
        <Fragment>
            <Head>
                <title>Add Result</title>
            </Head>
            <AddResult />
        </Fragment>
    )
}
