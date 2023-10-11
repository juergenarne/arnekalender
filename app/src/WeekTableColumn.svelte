<script lang="ts">
  import { strings } from "./strings";

  export let day: Date;
  const comp1 = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const today = new Date();
  const comp2 = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  let className = "today";
  if (comp1 < comp2) {
    className = "past";
  }
  if (comp1 > comp2) {
    className = "future";
  }
  if (day.getDay() === 6) {
    className += ' weekend'
  }
  if (day.getDay() === 0) {
    className += ' weekend'
  }
  className += ' ' + strings.class[day.getDay()]
</script>

<div class="col">
  <div class="row row-cols-1 {className}" data-weekday="{day.getDay()}">
    <div class="col week-table-header">
      {strings.day.short[day.getDay()]}. {day.getDate()}. {strings.mon.long[
        day.getMonth()
      ]}
    </div>
    {#each Array(24) as _, i}
      <div
        class="col week-table-cell"
        data-date="{day.getFullYear()}-{day
          .getMonth()
          .toString()
          .padStart(2, '0')}-{day.getDate()}"
        data-hour="{i.toString().padStart(2, '0')}:00"
      >
        &nbsp;
      </div>
    {/each}
  </div>
</div>
