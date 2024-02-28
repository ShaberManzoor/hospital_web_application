import {faqs} from '../assets/data/faqs'
import FaqItems from './FaqItems'

const FaqList = () => {
  return (
    <ul className='mt-[38px]'>
        {faqs.map((faq, index) => <FaqItems key={index} faq={faq} />)}
    </ul>
  )
}

export default FaqList