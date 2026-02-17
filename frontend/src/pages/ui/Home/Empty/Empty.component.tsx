
import { Button } from "@shared/ui"
import styles from "./Emty.module.scss"
import { Icons } from "@shared/assets"
import { Link, useNavigate } from "react-router-dom"

export const Empty = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Icons.Home.Explore />
        <h2> Your feed is empty</h2>
        <p> Find community or create your own.</p>
        <Button onClick={() => navigate('/explore')}>
          <Icons.UI.Explore /> Explore community
        </Button>
        <Link to="/community/create">
          Create community
        </Link>
      </div>
    </div>
  )
}