import React from 'react'

const PlusCircleIcon = ({ style }: { style?: string }) => {
    return (
        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={style ? style : "fill-white"}>
            <path d="M11.4878 11.4878C15.6019 7.37377 21.1818 5.0625 27 5.0625C32.8182 5.0625 38.3981 7.37377 42.5121 11.4878C46.6262 15.6019 48.9375 21.1818 48.9375 27C48.9375 32.8182 46.6262 38.3981 42.5121 42.5122C38.3981 46.6262 32.8182 48.9375 27 48.9375C21.1818 48.9375 15.6019 46.6262 11.4878 42.5122C7.37375 38.3981 5.06249 32.8182 5.06249 27C5.06249 21.1818 7.37375 15.6019 11.4878 11.4878ZM46.0919 46.0919C51.1554 41.0284 54 34.1608 54 27C54 19.8392 51.1554 12.9716 46.0919 7.90812C41.0284 2.84464 34.1608 -3.40235e-07 27 -3.40235e-07C19.8391 -3.40235e-07 12.9716 2.84464 7.90811 7.90812C2.84462 12.9716 -1.03164e-05 19.8392 -1.03164e-05 27C-1.03164e-05 34.1608 2.84462 41.0284 7.90811 46.0919C12.9716 51.1554 19.8391 54 27 54C34.1608 54 41.0284 51.1554 46.0919 46.0919ZM14.9184 27C14.9184 28.4021 16.052 29.5356 17.4466 29.5282H24.4569V36.5385C24.4569 37.9405 25.5905 39.0741 26.9851 39.0667C28.3797 39.0592 29.5207 37.9331 29.5133 36.5385V29.5282H36.5236C37.9256 29.5282 39.0592 28.3946 39.0517 27C39.0443 25.6054 37.9182 24.4644 36.5236 24.4718H29.5133V17.4615C29.5133 16.0595 28.3797 14.9259 26.9851 14.9333C25.5905 14.9408 24.4494 16.0669 24.4569 17.4615V24.4718H17.4466C16.0445 24.4718 14.9109 25.6054 14.9184 27Z" fill="white" />
        </svg>
    )
}

export default PlusCircleIcon
