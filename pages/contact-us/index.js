import ContactUs from '@/components/Misc/ContactUs'
import Head from 'next/head'
import React, { Fragment } from 'react'

export default function ContactPage() {
    return (

        <Fragment>
            <Head>
                <title>Contact Us</title>
            </Head>
            <ContactUs />
        </Fragment>
    )
}
