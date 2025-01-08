const ContactUs = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white border border-gray-300 rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-center">
                We do appreciate your feedback and suggestions.
            </h1>
            <p className="mb-2">We will be glad to hear from you if:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
                <li>You have found a mistake in our phone specifications.</li>
                <li>You have info about a phone which we don't have in our database.</li>
                <li>
                    You have a suggestion for improving <strong>MobilePrice.biz.pk</strong> or you want to request a feature.
                </li>
            </ul>
            <p className="mb-2">Before sending us an email, please keep in mind:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
                <li>We do not sell mobile phones.</li>
                <li>We do not know the price of any mobile phone in your country.</li>
                <li>We don't answer any "unlocking" related questions.</li>
                <li>We don't answer any "Which mobile should I buy?" questions.</li>
            </ul>
            <a
                href="mailto:support@mobileprice.biz.pk"
                className="text-blue-500 underline hover:text-blue-700"
            >
                support@mobileprice.biz.pk
            </a>
            <h5 className="text-xl font-semibold mt-6 mb-2">Advertising on MobilePrice.biz.pk</h5>
            <p>
                Do you have an online mobile store? Are you interested in advertising on our site?{' '}
                <strong>MobilePrice.biz.pk</strong> is accessed by millions of unique visitors daily, and is guaranteed to help boost your sales.
            </p>
        </div>
    );
};

export default ContactUs;
