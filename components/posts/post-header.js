import Image from 'next/image';

function PostHeader(props) {
  const { title, image, author, date } = props.data;

  return (
    <header>
          <div className="border-bottom border-3 my-3 align-items-center justify-content-center text-wrap">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item"><a href="#">Library</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Data</li>
              </ol>
          </div>
          <div id="blog-header my-2">
              <div className='h1'>
                <h1>{title}</h1>
              </div>
              <div className="fw-light lh-1 fs-6">
                <blockquote className="text-muted">
                  Created By {author} on {date}
                </blockquote>
              </div>
            </div>
            <br />
    </header>
  );
}

export default PostHeader;