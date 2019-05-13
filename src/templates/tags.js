import React from "react"
import kebabCase from "lodash/kebabCase"

import { Link, graphql } from "gatsby"
import '../styles/index.scss';

import Layout from "../components/layout"
import SEO from "../components/seo"

class Tags extends React.Component {
  render() {
    const { tag } = this.props.pageContext
    const { edges } = this.props.data.allMarkdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={tag}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <h1>{tag} Posts</h1>

        {edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date} {node.frontmatter.author}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              {node.frontmatter.tags.map( (tag) => {
                return (
                  <small key={kebabCase(tag)}><em>
                    <Link to={`/tags/${kebabCase(tag)}/`}>#{tag}</Link><span> </span>
                  </em></small>
                )
              })}
            </div>
          )
        })}

        <Link to="/tags">All tags</Link>
      </Layout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }    
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author
            date
            description
            tags
          }
        }
      }
    }
  }
`