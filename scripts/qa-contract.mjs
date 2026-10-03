export function assessViewport(qa, expected) {
  return {
    expectedViewport: expected,
    horizontalScroll: qa.scrollWidth > expected.width + 2,
    layoutViewportMismatch: Math.abs(qa.viewport.width - expected.width) > 2,
  };
}

export function qaFailures(qa) {
  const failures = [];
  for (const view of ['desktop', 'mobile']) {
    const result = qa?.[view];
    if (!result) { failures.push(`${view}: missing result`); continue; }
    for (const flag of ['blankRisk', 'horizontalScroll', 'layoutViewportMismatch']) {
      if (typeof result[flag] !== 'boolean') failures.push(`${view}: missing ${flag}`);
      else if (result[flag]) failures.push(`${view}: ${flag}`);
    }
    for (const list of ['textOverflow', 'smallButtons', 'blockingFixed']) {
      if (!Array.isArray(result[list])) failures.push(`${view}: missing ${list}`);
      else if (result[list].length) failures.push(`${view}: ${list} (${result[list].length})`);
    }
  }
  return failures;
}
