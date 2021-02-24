import React from 'react'
import styles from './about.module.scss'

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4>What we’ll do</h4>
        <p>
          You will taste the two Gins from Tanglin Distillery, Singapore’s first Gin Distillery. We
          will explore the botanicals that go into the Gin and the process of making the Gin. And
          using a Gin of your choice, we will teach you to make a bespoke cocktail. We will explore
          the botanicals that go into the Gin and the process of making the Gin. You will taste the
          two Gins from Tanglin Distillery, Singapore’s first Gin Distillery. And using a Gin of
          your choice, we will teach you to make a bespoke cocktail.
        </p>
      </div>
      <div className={styles.section}>
        <h4>What I’ll provide</h4>
        <p>
          Snacks You will get to sample snacks that are unique to a culture like Savoury Plantain
          Chips cooked in Coconut Oil from South India. Cocktail and Spirits You will get two
          tasting portions of Gin. And a full cocktail made with Gin.
        </p>
      </div>
      <div className={styles.section}>
        <h4>Additional requirement</h4>
        <p>
          You need to be 18 and above to attend this session. You will consume about 90ml of booze
          which is about three standard drinks.
        </p>
      </div>
    </div>
  )
}

export default About
