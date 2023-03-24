import { Helmet, HelmetProvider } from 'react-helmet-async'

interface HeadProps {
    title?: string
}

const Head: React.FC<HeadProps> = ({ title }) => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

    const metadatas = {
        site_name: 'React, Typescript Kanban',
        title: title || 'React, Typescript Kanban',
        description: 'A tasks kanban built using React, Typescript, Redux, Socket.io and Express.',
        image: `${process.env.REACT_APP_URL}/img/logo.png`,
        url: `${process.env.REACT_APP_URL}${pathname}`
    }

    return (
        <HelmetProvider>
            <Helmet title={metadatas.title} defaultTitle={metadatas.title} titleTemplate={`%s | ${metadatas.site_name}`}>
                <link rel="icon" href="/img/favicon.ico" />
                <meta name="description" content={metadatas.description} />
                <meta name="image" content={metadatas.image} />

                <meta property="og:site_name" content={metadatas.site_name} />
                <meta property="og:title" content={metadatas.title} />
                <meta property="og:description" content={metadatas.description} />
                <meta property="og:image" content={metadatas.image} />
                <meta property="og:url" content={metadatas.url} />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metadatas.title} />
                <meta name="twitter:description" content={metadatas.description} />
                <meta name="twitter:image" content={metadatas.image} />
                <meta name="twitter:site" content={metadatas.site_name} />

                {/* <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" /> */}
            </Helmet>
        </HelmetProvider>
    )
}

export default Head;