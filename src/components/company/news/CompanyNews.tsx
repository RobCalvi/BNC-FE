import React from 'react'
import News from '../../../models/news/news'
import CompanyItemGrid, { CompanyGridItem } from '../shared/CompanyItemGrid';
import CompanyNewsTile from './CompanyNewsTile';
import { v4 as uuidv4 } from 'uuid'

type CompanyNewsProps = {
    news: News[];
}

const CompanyNews: React.FC<CompanyNewsProps> = ({ news }) => {
    return (
        <CompanyItemGrid>
            {news.map(item => (
                <CompanyGridItem key={item.id ?? uuidv4()}>
                    <CompanyNewsTile
                        news={item}
                    />
                </CompanyGridItem>
            ))}
        </CompanyItemGrid>
    )
}

export default CompanyNews