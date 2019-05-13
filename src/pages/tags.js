import React from "react"
import kebabCase from "lodash/kebabCase"

import { Link, graphql } from "gatsby"

import '../styles/index.scss';

import Layout from "../components/layout"
import SEO from "../components/seo"

class TagsPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const tags = data.allMarkdownRemark.group

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All tags"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <h1>Tags</h1>
        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`