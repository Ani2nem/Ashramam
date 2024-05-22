import React from 'react'
import './About.css'

const About = () => {
    return (
        <section id="About" className='about-section'>
            <h1 className='about-title'>About Ashramam</h1>
            <p className='about-text'>This ashramam was founded by Sri Nemmani Ramamurthy in 1998. 
            It is said that Maatha Saraswati herself spoke to Srimathi Nemmani Vimalamma, Ramamurthy's beloved wife,
             requesting her to build this serene Sri Shiridi Sainath Ashram. Inspired by Maatha's divine words, the couple 
             constructed this powerful haven, which now stands as a pillar of strength and hope for our community.
             <br/><br/><br/>
             ఈ ఆశ్రమాన్ని 1998 లో శ్రీ నెమ్మని రామమూర్తి స్థాపించారు. ఈ నిర్మలమైన శ్రీ షిరిడీ సాయినాథ ఆశ్రమాన్ని నిర్మించమని మాతా సరస్వతి స్వయంగా రామమూర్తి ప్రియ 
             సతీమణి శ్రీమతి నెమ్మని విమలమ్మతో మాట్లాడిందని చెబుతారు. మాత యొక్క దైవిక పదాల నుండి ప్రేరణ పొందిన ఈ జంట ఈ శక్తివంతమైన స్వర్గధామాన్ని నిర్మించారు, 
             ఇది ఇప్పుడు మన సమాజానికి బలం మరియు ఆశాకిరణంగా నిలుస్తుంది.
             
            </p>
            <img className="founder-img" src="/founder.JPG" alt="founder" ></img>
        </section>
    )
}

export default About;