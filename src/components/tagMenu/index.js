import React, { useState } from "react"
import { Link, StaticQuery } from "gatsby"
import styles from "./tagmenu.module.scss"

// Utilities
import kebabCase from "lodash/kebabCase"

const TagMenu = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            group(field: frontmatter___category) {
              category: fieldValue
              totalCount
            }
          }
        }
      `}
      render={({ allMarkdownRemark: { group } }) => {
        group.sort((t1, t2) => {
          return t2.totalCount - t1.totalCount
        })
        return (
          <div className={styles.navWrapper}>
            <nav class={styles.navWrapperScroll}>
              <Link to={`/#posts`} getProps={props => setActive(props, "")}>
                {"Latest Updates"}
              </Link>
              {group.slice(0, 10).map((item, index) => (
                <Link
                  key={`cat_${index}`}
                  to={`/category/${kebabCase(item.category)}/#posts`}
                  getProps={props => setActive(props, item.category)}
                >
                  {item.category}
                </Link>
              ))}
            </nav>
          </div>
        )
      }}
    />
  )
}

const setActive = ({ location: { pathname } }, catg) => {
  if (catg) {
    return {
      className: pathname.includes(kebabCase(catg)) ? styles.active : "",
    }
  } else if (pathname === "/") {
    return { className: styles.active }
  }
}

export default TagMenu
