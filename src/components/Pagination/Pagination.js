import classNames from 'classnames/bind';
import styles from "./Pagination.module.scss";

let cx = classNames.bind(styles)

const Pagination = ({ page, totalPages, handlePagination }) => {
  return (
    <>
      {totalPages > 1 && (
        <div className={cx('wrapper')}>
          <ul className={cx('pagination')}>
            {page !== 1 && (
              <li
                onClick={() => handlePagination(page - 1)}
                className={cx('item', 'prev')}
              >
                &lt;
              </li>
            )}
            <li
              onClick={() => handlePagination(1)}
              className={cx('item', page === 1 && 'active')}
            >
              {1}
            </li>
            {page > 3 && totalPages > 5 && (
              <li className={cx('item','separator')}>...</li>
            )}

            {page >= 4 && totalPages === 5 && (
              <li className={cx('item')}>
                {2}
              </li>
            )}

            {page === totalPages && totalPages > 3 && (
              <li
                onClick={() => handlePagination(page - 2)}
                className={cx('item')}
              >
                {page - 2}
              </li>
            )}

            {page > 2 && (
              <li
                onClick={() => handlePagination(page - 1)}
                className={cx('item')}
              >
                {page - 1}
              </li>
            )}

            {page !== 1 && page !== totalPages && (
              <li
                onClick={() => handlePagination(page)}
                className={cx('item', 'active')}
              >
                {page}
              </li>
            )}

            {page < totalPages - 1 && (
              <li
                onClick={() => handlePagination(page + 1)}
                className={cx('item')}
              >
                {page + 1}
              </li>
            )} 

            {page === 1 && totalPages > 3 && (
              <li
                onClick={() => handlePagination(page + 2)}
                className={cx('item')}
              >
                {page + 2}
              </li>
            )}

            {page < totalPages - 2 && totalPages > 5 && (
              <li className={cx('item','separator')}>...</li>
            )}

            {page < 3 && totalPages === 5 && (
              <li
                onClick={() => handlePagination(totalPages - 1)}
                className={cx('item')}
              >
                {4}
              </li>
            )}

            {totalPages > 1 && (
              <li
                onClick={() => handlePagination(totalPages)}
                className={cx('item', page === totalPages && 'active')}
              >
                {totalPages}
              </li>
            )}

            {page !== totalPages && (
              <li
                onClick={() => handlePagination(page + 1)}
                className={cx('item', 'next')}
              >
                &gt;
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Pagination