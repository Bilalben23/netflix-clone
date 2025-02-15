import { MOVIE_CATEGORIES, TV_CATEGORIES } from '../utils/constants';
import ContentSlider from './ContentSlider';

export default function CategoryContentSection({ media }) {

    return (
        <div className='flex flex-col gap-y-10 my-5'>
            {
                (media === "movie"
                    ? MOVIE_CATEGORIES
                    : TV_CATEGORIES).map(category => <ContentSlider
                        key={category}
                        category={category}
                    />)
            }
        </div>

    )
}
