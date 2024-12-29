import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { repo, filePath } = context.query;
    const { showAuthor } = context.query;

    let lastEdited = null;

    if (repo && typeof repo === 'string' && repo !== '' && filePath && filePath !== '') {
        try {
            // Extract the repo name from the full GitHub repo URL
            const repoName = repo.replace('https://github.com/', '');

            // Fetch commit information from GitHub API for the specified file in the repo
            const response = await fetch(`https://api.github.com/repos/${repoName}/commits?path=${filePath}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const { commit } = data[0];
                lastEdited = {
                    date: new Date(commit.author.date).toLocaleDateString(),
                    author: commit.author.name,
                };
            } else {
                console.log(`No commit data found for repo: ${repo}`);
            }
        } catch (error) {
            console.error('Error fetching last edited info:', error);
        }
    }

    return {
        props: {
            repo,
            showAuthor,
            lastEdited,
        },
    };
};

const LastEdited = ({ showAuthor, repo, lastEdited }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (!repo) return null;

    if (!lastEdited || !lastEdited.date || !lastEdited.author) {
        console.log(`No last edited information found for repo: ${repo}`);
        return null;
    }

    const author = lastEdited.author;
    const date = lastEdited.date;

    return (
        <div>
            Last edited {date}
            {showAuthor && <span> by {author}</span>}
        </div>
    );
};

export default LastEdited;
