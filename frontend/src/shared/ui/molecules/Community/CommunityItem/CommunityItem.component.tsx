import type { ICommunityItemProps } from "./CommunityItem.types"
import styles from "./CommunityItem.module.scss"
import { Private, Verification } from "@shared/assets"
import { useEffect, useRef, useState } from "react"
import { Tag } from "./Tag/Tag.component"
import { Link } from "react-router-dom"

const TAGS_ROW_SIZE = 180

export const CommunityItem = ({ avatar, isPublic, membersCount, name, tags, verification, link }: ICommunityItemProps) => {
  const wrapperTagsRef = useRef<HTMLDivElement>(null)
  const tagsRefs = useRef<(HTMLDivElement | null)[]>([])
  const [settingsTags, setSettingsTags] = useState<{
    visibleCount: number, countHidden: number
  }>({ visibleCount: tags.length, countHidden: 0 })

  const getRowSize = () => {
    if (tagsRefs.current.length !== tags.length) {
      return
    }
    const hasSizes = tagsRefs.current.every(tag => tag && tag.offsetWidth > 0)
    if (!hasSizes) {
      return
    }

    if (wrapperTagsRef.current && wrapperTagsRef.current?.offsetWidth > TAGS_ROW_SIZE) {
      const simulationWrapper = document.createElement('div')
      simulationWrapper.style.position = "absolute"
      simulationWrapper.style.width = TAGS_ROW_SIZE + 'px'
      simulationWrapper.style.height = "40px"
      simulationWrapper.style.visibility = "hidden"
      simulationWrapper.style.top = "-9999px"
      simulationWrapper.style.display = "flex"
      document.body.appendChild(simulationWrapper)

      const clonedTags: HTMLDivElement[] = []
      tagsRefs.current.forEach((tag, index) => {
        if (!tag) return


        const clonedTag = tag.cloneNode(true) as HTMLDivElement

        const computedStyle = window.getComputedStyle(tag)
        clonedTag.style.cssText = computedStyle.cssText

        if (index > 0) {
          clonedTag.style.marginRight = "4px"
        }

        simulationWrapper.appendChild(clonedTag)
        clonedTags.push(clonedTag)
      })


      let currentWidth = 0
      let visibleCount = 0

      clonedTags.forEach((clonedTag, index) => {
        const tagWidth = clonedTag.offsetWidth
        const margin = index > 0 ? 4 : 0
        const totalWidth = currentWidth + tagWidth + margin

        if (totalWidth <= TAGS_ROW_SIZE) {
          currentWidth = totalWidth
          visibleCount++
        }
      })

      const countHidden = tags.length - visibleCount

      document.body.removeChild(simulationWrapper)
      setSettingsTags({ visibleCount: visibleCount, countHidden: countHidden })
      return { visibleCount, countHidden }
    } else {
      setSettingsTags({ visibleCount: tags.length, countHidden: 0 })
    }
  }

  useEffect(() => {
    getRowSize()
  }, [tags])

  return (
    <Link to={link} className={styles.link}>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <img src={avatar} alt={name} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>
            {!isPublic && <Private />} {name} {verification && <Verification />}
          </h3>
          <div className={styles.tags} ref={wrapperTagsRef}>
            {tags.map((tag, index) => {
              const isVisible = index < settingsTags.visibleCount
              return (
                <Tag
                  key={index}
                  title={tag}
                  ref={(el) => {
                    tagsRefs.current[index] = el
                  }}
                  style={{ display: isVisible ? 'inline-block' : 'none' }}
                />
              )
            })}
            {settingsTags.countHidden > 0 && (
              <Tag title={`+${settingsTags.countHidden}`} />
            )}
          </div>
          <span className={styles.members}>
            {membersCount} members
          </span>
        </div>
      </div>
    </Link>

  )

}