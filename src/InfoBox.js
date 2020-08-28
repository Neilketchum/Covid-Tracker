import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core'
import numeral from 'numeral';
function InfoBox({title,cases,total}) {
    return (
        <Card className = "infoBox">
            <CardContent>
                <Typography color = "textSecondary" >
                    {title}
                </Typography>
                <h2 className = "infoBox_cases">{cases}</h2>
                <Typography  className = "infoBox_total" color = "textSecondary">Total :{ numeral(total).format()} </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
