import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import Layout from '../../components/layout.js';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';


// renders a post page with dynamic routes
//render contentHtml with dangerouslySetInnerHTML
export default function Post({ postData }) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
}

//returns a list/array of possible values for id
export async function getStaticPaths() {
    //paths contains the array of known paths returned by getAllPostIds()
    const paths = getAllPostIds()
    return {//If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page
        paths,
        fallback: false
    }
}

// Fetches necessary data for the blog post using params.id
//Use `getStaticProps` to fetch a specific post given an ID and `getStaticPaths` to fetch all possible blog posts
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)

    return {
        props: {
            postData
        }
    }
}
