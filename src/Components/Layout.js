import React from 'react'
import { styled } from '@mui/styles'

const LayoutRoot = styled('div')({
    display: 'flex',
    height: '100%',
    width: '100%',
    overflow: 'hidden' 
})

const LayoutWrapper = styled('div')({
    flex: '1 1 auto',
    marginTop: 64,
    backgroundColor: '#646881',
    overflow: 'hidden'
})

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
})

const LayoutContent = styled('div')({
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
})

export default function Layout({children}){
    return (
        <LayoutRoot>
            <LayoutWrapper>
                <LayoutContainer>
                    <LayoutContent>
                        {children}
                    </LayoutContent>
                </LayoutContainer>
            </LayoutWrapper>
        </LayoutRoot>
    )
}