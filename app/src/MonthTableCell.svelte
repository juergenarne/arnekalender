<script lang="ts">
    export let day:Date
    const comp1 = new Date(day.getFullYear(), day.getMonth(), day.getDate())
    const today = new Date()
    const comp2 = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    let className = "today"
    if (comp1 < comp2) {className = "past"}
    if (comp1 > comp2) {className = "future"}
    $$restProps.class += ' ' + className
</script>

<div {...$$restProps}>
    <div class="date-label">
        <span class="date-number">
            {day.getDate()}
        </span>
    </div>
</div>