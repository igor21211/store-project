import styled from "styled-components";

// Обертка для сортировки
export const SortWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

// Стили для dropdown сортировки
export const SortSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
