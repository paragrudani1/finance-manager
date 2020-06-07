import React, {Component} from 'react';
import classes from './Sidebar.module.css'
import styled, {css, keyframes} from 'styled-components'

class Sidebar extends Component {
    state = {
        link: [
            '/home',
            '/blog',
            '/project',
            '/about',
        ],
        navTag: [
            'Home',
            'Blog',
            'My Projects',
            'About Me',
        ],
    }

   
    render() {        

        let attachedClasses = [classes.navlinks]
        if (this.props.toggled) {
            attachedClasses = [classes.navlinks, classes.toggle]          
        }

            
            const navlinkFade = keyframes`
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
    
        to {
            transform: translateX(0);
            opacity: 1;
     
        `


        const navlink = this.state.navTag.map((el,index) => {
        
            const animation = css`
            ${navlinkFade} ${index/4}s ease-in-out forwards .5s;
        `
        
        const Animated = styled.li`
        a {
                    text-decoration: none;
                    position: relative;
                }
            
                a:before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 0px;
                    background-color: white;
                    transition: height 0.3s cubic-bezier(0, 0.68, 0.38, 1.4);
                }
                
                text-align: left;
                font-size: 40px;
                font-family: 'Josefin Sans',
                sans-serif;
                padding: 10px;
                margin: 5px;
                transform: translateX(-100%);
                position: relative;
                animation: ${animation}
                
                
                a:hover:before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                width: 100%;
                height: 110%;
                background: white;
                opacity: .5;
                transition: height 0.3s cubic-bezier(0, 0.68, 0.38, 1.4);
            }
            `
            return (
                <React.Fragment>
                    <Animated  anim={this.props.toggled}>{el}</Animated>
                </React.Fragment>
            )
        })
        
        
        return ( 
            //  navigation links
        <div className={attachedClasses.join(' ')}>
            <ul>
               {
                       this.state.link.map((el, key) => { 
                        return [...Array(this.state.link[key])]   
                        .map((_,i) => {
                           return  <a key={el} href={`${process.env.PUBLIC_URL}${_}`} onClick={() => !this.props.toggled}>{navlink[key]}</a>
                        })
                       })
               }
            </ul>
    
            <div className={classes.copyright}>
            <p> ©2019 <a href='/home'>paragrudani.com</a></p>
            </div>
        </div>
         );

    }
}
 
export default Sidebar;